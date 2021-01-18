const Train = require('../models/TrainModel')

const trainCtrl = {
    getTrains: async(req, res) =>{
        try {
            const trains = await Train.find()
            res.json(trains)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createTrain: async (req, res) =>{
        try {
            // if user have role = 1 ----> admin
            // only admin can create, delete and update train
            const {Id, name} = req.body
            const train = await Train.findOne({Id})
            if(train) return res.status(400).json({msg: "This train already exists."})

            const newTrain = new Train({Id, name})

            await newTrain.save()
            res.json({msg : "Train created successfully"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteTrain: async (req, res) => {
        try {
            await Train.findOneAndDelete({Id: req.params.Id})
            res.json({msg: "Deleted the train"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateTrain: async (req, res) => {
        try {
            await Train.findOneAndUpdate({Id:req.params.Id}, {name: req.body.name})
            res.json({msg: "Updated the train"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getTrain : async (req, res) => {
        try {
            const train = await Train.findOne({Id: req.params.Id})
            if(!train) return res.status(400).json({msg: "Train does not exists for this Id."})
            res.json(train)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = trainCtrl