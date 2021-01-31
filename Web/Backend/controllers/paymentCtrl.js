const Payment = require('../models/paymentModel')
const Station = require('../models/StationModel')

const paymentCtrl = {
    createPayment: async (req, res) => {
        try {
            const s1 = req.body.s1
            const s2 = req.body.s2
            let Id;
            console.log(req.body)
            const station1 = await Station.findOne({Id: s1})
            if(!station1) return res.status(400).json({msg: "Station 1 Id is incorrect"})

            const station2 = await Station.findOne({Id: s2})
            if(!station2) return res.status(400).json({msg: "Station 2 Id is incorrect"})
            
            if(s1 === s2) {
                return res.status(400).json({msg: "You cannot enter same Id for two stations"})
            }

            if(s1 < s2){
                Id = s1+s2
            }else{
                Id = s2+s1
            }
            console.log(Id)
            const respons = Station.findOne({Id: Id})
            if(respons) return res.status(400).json({msg: "Payment method available for this Id"})
            
            const newPayment = new Payment({
                Id: Id,
                first: req.body.first,
                second: req.body.second,
                third: req.body.third
            })
            await newPayment.save()
            res.json({msg : "successfull"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPayment: async (req, res) => {
        console.log(req.body)
        try {
            const payment = await Payment.findOne({Id: req.params.Id})
            if(!payment) return res.status(400).json({msg: "Cannot find"})
            res.json(payment)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePayment: async (req, res) => {
        try {
            await Payment.findOneAndUpdate({Id:req.params.Id}, {first: req.body.first, second: req.body.second, third: req.body.third})
            res.json({msg: "Updated the payment"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    increasePayment: async (req, res) => {
        try {
            await Payment.updateMany({}, {$inc:{first: req.body.first, second: req.body.second, third: req.body.third}})
            res.json({msg: "Increased payments"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    decreasePayment: async (req, res) => {
        try {
            await Payment.updateMany({}, {$inc:{first: -req.body.first, second: -req.body.second, third: -req.body.third}})
            res.json({msg: "Decreased payments"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = paymentCtrl