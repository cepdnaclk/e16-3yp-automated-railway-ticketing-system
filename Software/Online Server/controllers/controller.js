/*
var bodyParser = require('body-parser') //to access to the req.body data(for POST method)
var mongoose = require('mongoose'); //to interract with database

//Connect to the database
mongoose.connect('mongodb+srv://Kavindu:<password>@cluster0.0hfpe.mongodb.net/todo?retryWrites=true&w=majority'); //connect to the database 

//Create a schema -> this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

//Model type
var Todo = mongoose.model('Todo', todoSchema);

//some dummy data here passing as a array to display as todos list
//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]; 

var urlencodedParser = bodyParser.urlencoded({extended: false});
*/

module.exports = function(app){
    app.get('/', function(req, res){
            res.render('index'); //sending data to the view
        });
}