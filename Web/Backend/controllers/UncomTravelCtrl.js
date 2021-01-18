const Uncom = require('../models/UncomTravelModel')
const Station = require('../models/StationModel')
const Train = require('../models/TrainModel')
const Customer = require('../models/CustomerModel')
const Travel = require('../models/TravelModel')

const uncomTravelCtrl = {
    getUncomTravel: async (req, res) => {
        try {
            const uncomTravel = await Uncom.findOne({UserId: req.params.Id})
            if(!uncomTravel) return res.status(400).json({msg: "does not exists for this Id."})
            res.json(uncomTravel)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createTravel: async (req, res) => {
        try {
            const UserId = req.params.Id
            const S_StationId = req.body.S_StationId

            const isFreezed = await Uncom.findOne({UserId: UserId})
            if(isFreezed) return res.status(400).json({msg: "This account is freezed."})

            const station = await Station.findOne({Id: S_StationId})
            const S_StationName = station.name

            const newTravel = new Uncom({UserId, S_StationId, S_StationName})
            await newTravel.save()
            res.json({msg: "Travel created successfully"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateClass: async (req, res) => {
        try {
            const isStarted = await Uncom.findOne({UserId: req.params.Id})
            if(!isStarted) return res.status(400).json({msg: "Not started a travel"})

            const train = await Train.findOne({Id: req.body.TrainId})

            await Uncom.findOneAndUpdate({UserId: req.params.Id}, {class: req.body.class, TrainId: req.body.TrainId, Train: train.name})
            res.json({msg: "Updated the class"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    endTravel: async (req, res) => {
        try {
            const isStarted = await Uncom.findOne({UserId: req.params.Id})
            if(!isStarted) return res.status(400).json({msg: "Not started a travel"})

            const E_StationId = req.body.E_StationId
            const station = await Station.findOne({Id: E_StationId})
            const E_StationName = station.name
            const cost = req.body.cost

            const customer = await Customer.findOne({Id: req.params.Id})
            let balance = customer.balance
            await Uncom.findOneAndUpdate({UserId: req.params.Id}, {cost: cost, E_StationId: E_StationId, E_StationName: E_StationName})
            if(balance < cost) return res.status(500).json({msg: "Not sufficient balance"})


            const newTravel = new Travel({
                UserId: req.params.Id, 
                S_StationId: isStarted.S_StationId,
                S_StationName: isStarted.S_StationName,
                class: isStarted.class,
                TrainId: isStarted.TrainId,
                Train: isStarted.Train,
                E_StationId: E_StationId,
                E_StationName: E_StationName,
                cost: cost
            })
            await newTravel.save()
            await Uncom.findOneAndDelete({UserId: req.params.Id})
            balance = balance - cost
            await Customer.findOneAndUpdate({Id: customer.Id}, {balance: balance})
            
            res.json({msg : "successfull"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = uncomTravelCtrl