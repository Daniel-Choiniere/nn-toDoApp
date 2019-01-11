var bodyPasrser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database 
mongoose.connect('mongodb://testlist:testlist1@ds153314.mlab.com:53314/todolist');

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
   item: String 
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//     if (err) throw err;
//     console.log('item saved');
// })

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyPasrser.urlencoded({extended: false});

module.exports = function(app){
    
    app.get('/todo', function(req, res){
        // get data from mongodb and pass it to view
        
        // if i want to retrieve a certain item from the datatbase
        // Example -- Todo.find({item: 'buy flowers'});
        
        // if i want to retrieve all items in database
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });
    
    app.post('/todo', urlencodedParser, function(req, res){
        // get data from the view and add it to mongoDB
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        })
    });
    
    app.delete('/todo/:item', function(req, res){
        // delete the requested item from mongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });
};