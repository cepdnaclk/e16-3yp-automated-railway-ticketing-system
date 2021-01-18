const mongoose = require('mongoose')

const TravelSchema = new mongoose.Schema({
    UserId:{
        type: String,
        required: true
    },
    S_StationId:{
        type: String,
        required: true
    },
    S_StationName:{
        type: String,
        required: true  
    },
    class:{
        type: Number,
        default: 3
    },
    TrainId: {
        type: String
    },
    Train:{
        type: String
    },
    E_StationId:{
        type: String
    },
    E_StationName:{
        type: String
    },
    cost:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Travel', TravelSchema)