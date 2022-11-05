const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");


router.get('/', async (req, res, next) =>{
    try{
        const results = await db.query(`SELECT code,name FROM industries`);
        return res.json({Industries: results.rows})
    } catch (e) {
        return next(e);
    }
});
router.post('/link', async (req,res,next)=>{
    try{
        const {comp_code, industry} = req.body
        const results = await db.query(`INSERT INTO industries (comp_code, industry) VALUES ($1, $2) RETURNING id, comp_code, industry`,[comp_code, industry]);
        if (results.rows.lentgh === 0){
            throw new ExpressError(`Unable to add invoice `, 404)
        }
        return res.json({Industry:results.rows[0]});
    } catch (e) {
        return next(e);
    }
});
router.post('/', async (req,res,next)=>{
    try{
        const {comp_code, industry} = req.body
        const results = await db.query(`INSERT INTO industries (comp_code, industry) VALUES ($1, $2) RETURNING id, comp_code, industry`,[comp_code, industry]);
        if (results.rows.lentgh === 0){
            throw new ExpressError(`Unable to add invoice `, 404)
        }
        return res.json({Industry:results.rows[0]});
    } catch (e) {
        return next(e);
    }
});



module.exports = router;