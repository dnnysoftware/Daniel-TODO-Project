const router = require('express').Router();

const todoItemsModel = require('../models/todoItems');

/* 
Adds a single ToDo item to the database
*/
router.post('/add/item', async (req, res) => {
    try{
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    }catch(err) {
        res.json(err);
    }
});

/* 
Receives all ToDo's within the database
*/
router.get('/receive/items', async (req, res) => {
    try{
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems);
    }catch(err) {
        res.json(err);
    }
});

/* 
Updates a ToDo item with a specific ID
*/
router.put('/update/item/:id', async (req, res) => {
    try{
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json("Item Updated");
    }catch(err) {
        res.json(err);
    }
});


router.delete('/delete/item/:id', async (req, res) => {
    try{
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Item Deleted"); 
    }catch(err) {
        res.json(err);
    }
});

module.exports = router;