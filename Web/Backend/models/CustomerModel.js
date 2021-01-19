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
    address1:{
        type: String,
    },
    address2:{
        type: String,
    },
    address3:{
        type: String,
    },
    balance:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Customers', customerSchema)