const Users = require('../models/UserModel')
const Customers = require('../models/CustomerModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) =>{
        try {
            const {Id, password, role} = req.body;

            const customer = await Customers.findOne({Id})
            if(!customer) return res.status(400).json({msg:'Cant find a user for this Id'})

            if(password.length < 6)
                return res.status(400).json({msg: 'Password should be atleast 6 characters long'})

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            
            const newUser = new Users({
                Id, password: passwordHash, role
            })
            
            await newUser.save()

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 //7d
            })

            res.json({accesstoken});
            // res.json({msg:'Register successfull'});

        } catch (err) {
            return res.status(500).json({msg: "Account for this Id is already exists!"})
        }
    },
    login: async (req, res) =>{
        try {
            const {Id, password} = req.body;
            console.log(req.body)
            const user = await Users.findOne({Id})
            if(!user) return res.status(400).json({msg: "User does not exists!"})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(500).json({msg: "Incorrect password."})

            // If login success, create access token and refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken});
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) =>{

        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})
                const accesstoken = createAccessToken({id: user.id})
                res.json({accesstoken})
            })
            res.json({rf_token})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist"})  
            res.json(user) 
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    changePassword: async (req, res) => {
        try {
            const passwordOld = req.body.passwordOld
            const passwordNew = req.body.passwordNew
            const passwordConf = req.body.passwordConf
            const user = await Users.findOne({Id: req.params.Id})
            if(!user) return res.status(400).json({msg: "User does not exist"}) 

            const isMatch = await bcrypt.compare(passwordOld, user.password)
            if(!isMatch) return res.status(500).json({msg: "Old password you provided is incorrect"})
            if(passwordNew !== passwordConf) return res.status(500).json({msg: "Confirm password you provided is mismatching"})
            if(passwordNew === passwordOld) return res.status(500).json({msg: "New password cannot be the same as oldOne"})
            const passwordHash = await bcrypt.hash(passwordNew, 10)

            await Users.findOneAndUpdate({Id: user.Id}, {password: passwordHash})
            res.json({msg:"Password updated successfully"})

        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    deleteUser: async (req, res) =>{
        try{
            await Users.findOneAndDelete({Id: req.params.Id})
            res.json({msg: "Deleted User"})
        }catch (err){
            return res.status(500).json({msg: err.message})
        }
    },
    findUser: async (req, res) => {
        console.log(req.body)
        const user = await Users.findOne({Id: req.params.Id}).select('-password')
        if(!user) return res.status(400).json({msg: "User does not exixts"})
        res.json(user)
    },
    recharge: async (req, res) => {
        try {
            const deposit = req.body.deposit;
            const balance = await Customers.findOne({Id: req.body.userId}).select('balance')
            if(!balance) return res.status(400).json({msg: "User does not exists"})
            await Customers.findOneAndUpdate({Id: req.body.userId}, {balance: balance.balance + deposit})
            res.json({msg: "Recharged Successfully"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        } 
    }
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl