const mongoose = require('mongoose')

const stationSchema = new mongoose.Schema({
    Id:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Station', stationSchema)