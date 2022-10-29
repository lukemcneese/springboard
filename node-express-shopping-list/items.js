let items = require('./fakeDB');
const express = require('express');
const router = express.Router();

router.get('', function(req, res, next) {
    try{
    return res.json(items)
    } catch (err) {
        return next(err)
    }
});

router.post('', function(req,res,next){
    try{
    const item = req.body;
    items.push(item)
    return res.json({"added":item})
    } catch (err) {
        return next(err)
    }
});

router.get('/:name', function(req, res,next){
    try{
    const itemName = req.params.name;
    const item = items.find(item => item.name === itemName)
    return res.json(item)
    } catch (err) {
    return next(err)
    }
});

router.patch('/:name', function(req, res, next){
    try{
    const itemName = req.params.name;
    const updatedItem = req.body;
    const index = items.findIndex(item => item.name === itemName)
    items[index] = updatedItem;
    return res.json({"updated":items[index]})
    } catch (err) {
        return next(err)
    }
});

router.delete('/:name', function(req, res, next){
    try {
    const itemName = req.params.name;
    const index = items.findIndex(item => item.name === itemName)
    items.splice(index,1)
    return res.json({"message":"deleted"})
    } catch (err) {
        return next(err)
    }
});
module.exports = router;