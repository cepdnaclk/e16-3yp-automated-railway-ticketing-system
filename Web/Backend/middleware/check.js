token = process.env.REFRESH_TOKEN_SECRET

const check = (req, res, next) =>{
    try {
        const recieve = req.header("Authorization")
        if(!recieve) return res.status(400).json({msg: "Invalid authentication"})

        if(recieve === token){
            next()
        }else{
            return res.status(400).json({msg: "Invalid authentication"})
        }
    } catch (err) {
        if(err) return res.status(400).json({msg: "Invalid authentication"})
    }
}

module.exports = check

