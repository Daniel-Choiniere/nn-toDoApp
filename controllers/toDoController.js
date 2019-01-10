var bodyPasrser = require('body-parser');

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