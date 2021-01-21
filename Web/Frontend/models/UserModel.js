const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Id:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)