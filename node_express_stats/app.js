const {mean, median, mode} = require('mathjs')

const express = require('express');
const ExpressError = require('./expressError');

const app = express();
const digit = ["0","1","2","3","4","5","6","7","8"]

app.use(express.json());

app.get('/mean', function(req, res, next) {
    try{
        let nums = req.query.nums;
        if (!nums) throw new ExpressError("Nums are Required", 400);
        let numsArray = nums.split(",")
        if (!numsArray.every(num =>{
            return num in digit
        })) throw new ExpressError("Nums does not contain all numbers", 400);
        let m = mean(numsArray)
        return res.status(200).json({"operation": "mean", "value":m});
    }
    catch (err){
        return next(err)
    }
});

app.get('/median', function(req, res, next) {
    try{
        let nums = req.query.nums;
        if (!nums) throw new ExpressError("Nums are Required", 400);
        let numsArray = nums.split(",")
        if (!numsArray.every(num =>{
            return num in digit
        })) throw new ExpressError("Nums does not contain all numbers", 400);
        let m = median(numsArray)
        return res.status(200).json({"operation": "median", "value":m});
    }
    catch (err){
        return next(err)
    }
});

app.get('/mode', function(req, res, next) {
    try{
        const nums = req.query.nums;
        if (!nums) throw new ExpressError("Nums are Required", 400);
        const numsArray = nums.split(",")
        if (!numsArray.every(num =>{
            return num in digit
        })) throw new ExpressError("Nums does not contain all numbers", 400);
        const m = mode(numsArray)
        return res.status(200).json({"operation": "mode", "value":m});
    }
    catch (err){
        return next(err)
    }
});

/** Start server on port 3000 */

app.listen(3000, function() {
    console.log('Server started on port 3000.');
  });