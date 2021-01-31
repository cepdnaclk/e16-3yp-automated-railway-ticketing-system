const Train = require('../models/TrainModel')

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

const trainCtrl = {
    getTrains: async(req, res) =>{
        try {
            const features = new APIfeatures(Train.find(), req.query).filtering().sorting()
            const trains = await features.query
            res.json({
                status: 'success',
                results: trains.length,
                trains: trains
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createTrain: async (req, res) =>{
        console.log(req.body)
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