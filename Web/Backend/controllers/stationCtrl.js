const Station = require('../models/StationModel')

const stationCtrl = {
    getStations: async(req, res) => {
        try {
            const stations = await Station.find()
            res.json(stations)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createStation: async (req, res) => {
        try {
            const {Id, name} = req.body
            const station = await Station.findOne({Id})
            if(station) return res.status(400).json({msg: "This station already exists."})

            const newStation = new Station({Id, name})

            await newStation.save()
            res.json({msg: "Station created successfully"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteStation: async (req, res) => {
        try {
            await Station.findOneAndDelete({Id:req.params.Id})
            res.json({msg: "Deleted the station"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateStation: async (req, res) => {
        try {
            await Station.findByIdAndUpdate({Id: req.params.Id}, {name: req.body.name})
            res.json({msg: "Updated the station"})
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    getStation: async (req, res) =>{
        try {
           const station = await Station.findOne({Id: req.params.Id})
           if(!station) return res.status(400).json({msg: "Station does not exists for this Id."})
           res.json(station)
        } catch (err) {
            return res.status(500).json({msg: err.message}) 
        }
    }
}

module.exports = stationCtrl