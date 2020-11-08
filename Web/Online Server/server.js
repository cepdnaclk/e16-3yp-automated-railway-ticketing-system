var express = require('express');
var app = express();
var todoController = require('./controllers/controller');
//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public')); //finding any static file inside the public folder

//fire controllers
todoController(app);

const port = process.env.PORT || 3000;
//listen to port
app.listen(port, ()=>{
    console.log("whazzaaaaap");
});
console.log('You are listening to port 3000');