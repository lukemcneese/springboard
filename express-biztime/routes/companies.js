const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");
const { query } = require("express");

router.get('/', async (req, res, next) =>{
    try{
        const results = await db.query(`SELECT code,name FROM companies`);
        return res.json({companies: results.rows})
    } catch (e) {
        return next(e);
    }
});
router.get('/:code', async (req, res, next) =>{
    try{
        const results = await db.query(`SELECT * FROM companies WHERE code = $1`[code])
        if (results.rows.length === 0){
            throw new ExpressError(`Unable to locate company code: ${code}`, 404)
        }
        return res.json({company: results.rows[0]})
    } catch (e){
        return next (e);
    }
});
router.post('/', async (req, res, next) =>{
    try{
        const {code, name, description} = req.body;
        const results = await db.query('INSESRT INTO companies (code, name, description) VALUES ($1,$2,$,3) RETURNING (code, name, description)', [code, name, description])
        return res.status(201).json({company: results.rows[0]})
    } catch (e){
        return next (e);
    }
});
router.put('/:code', async (req, res, next) =>{
    try{
        const {name, description} = req.body;
        const {code} = req.params;
        const results = await db.query('UPDATE companies SET name=$1, descpiption=$2 WHERE code=$3 RETURNING code, name, description', [name, descrpition, code])
        if (results.rows.length === 0){
            throw new ExpressError(`Unable to locate company code: ${code}`, 404)
        }
        return res.status(201).json({company: results.rows[0]})
    } catch (e){
        return next (e);
    }    
});
router.delete('/:code', async (req, res, next) => {
    try {
      db.query('DELETE FROM companies WHERE code = $1', [req.params.code])
      return res.send({ status: "deleted" })
    } catch (e) {
      return next(e)
    }
});
module.exports = router;