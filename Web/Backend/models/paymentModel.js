const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    Id:{
        type: String,
        required: true,
        unique: true
    },
    first:{
        type: Number,
        required: true
    },
    second:{
        type: Number,
        required: true
    },
    third:{
        type: Number,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Payment', paymentSchema)