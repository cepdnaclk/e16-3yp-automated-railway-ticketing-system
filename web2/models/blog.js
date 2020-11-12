const mongoose = require('mongoose'); //import the database connection
const Schema = mongoose.Schema; //get the schema

const blogSchemaPassengers = new Schema({ //this is for the addmission of passengers
    name: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    tele: {
        type: String,
        required: true
    },
}, { timestamps: true }); //time stamp to get the time when a new document is entered to the data base

const blogSchemaTrain = new Schema({ //this is temporary collection to get the train details
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true });

const BlogPassengers = mongoose.model('Passenger', blogSchemaPassengers); //here get the connection
const BlogTrains = mongoose.model('Blog', blogSchemaTrain); //here get the connection

module.exports = { //export all the methods for usage in another file
    BlogPassengers,
    BlogTrains
}