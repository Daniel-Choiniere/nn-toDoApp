var express = require('express');
var toDoController = require('./controllers/toDoController');

var app = express();

// set up the template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers
toDoController(app);

// listen to port
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('now listening for requests');
});