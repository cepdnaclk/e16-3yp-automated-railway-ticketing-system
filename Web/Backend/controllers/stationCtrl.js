const Station = require('../models/StationModel')

class APIfeatures {
    constructor(query, queryString){
        this.query = query
        this.queryString = queryString
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query
 
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))
        
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
 
     //    gte = greater than or equal
     //    lte = lesser than or equal
     //    lt = lesser than
     //    gt = greater than
        this.query.find(JSON.parse(queryStr))
        console.log(JSON.parse(queryStr))
          
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;

    }
}

const stationCtrl = {
    getStations: async(req, res) => {
        try {
            const features = new APIfeatures(Station.find(), req.query).filtering().sorting()
            const stations = await features.query
            res.json({
                status: 'success',
                results: stations.length,
                stations: stations
            })
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
            await Station.findOneAndUpdate({Id: req.params.Id}, {name: req.body.name})
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