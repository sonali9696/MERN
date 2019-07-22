const express = require ('./node_modules/express');
const router = express.Router();
const Todo = require('../models/todo');

//To display all todos:
router.get('/todos', (req, res, next) => {

    //this will return all the data,
    //exposing only the id and action field to the client
    Todo.find({}, 'action')
    .then(data => res.json(data))
    .catch(next)

});

//To add a todo:
router.post('/todos', (req, res, next) => {
    if(req.body.action){
        Todo.create(req.body)
          .then(data => res.json(data))
          .catch(next)
      }else {
        res.json({
          error: "The input field is empty"
        })
      }
});

//To delete a todo:
router.delete('/todos/:id', (req, res, next) => {
    Todo.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;