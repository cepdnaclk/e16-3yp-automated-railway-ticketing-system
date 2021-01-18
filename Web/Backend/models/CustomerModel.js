const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    Id:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    balance:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Customers', customerSchema)