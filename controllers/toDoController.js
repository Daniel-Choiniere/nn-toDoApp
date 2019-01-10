var bodyPasrser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database 
mongoose.connect('mongodb://testlist:testlist1@ds153314.mlab.com:53314/todolist');

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
   item: String 
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
})

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyPasrser.urlencoded({extended: false});

module.exports = function(app){
    
    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });
    
    app.post('/todo', urlencodedParser, function(req, res){
        data.push(req.body);
        res.json({todos: data});
    });
    
    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
           return todo.item.replace(/ /g, '_') !== req.params.item;
        });
    });
};