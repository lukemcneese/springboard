const express = require("express");
const slugify = require("slugify");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");


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
        const {code} = req.params;
        const results = await db.query(`SELECT * FROM companies WHERE code = $1`,[code])
        if (results.rows.length === 0){
            throw new ExpressError(`Unable to locate company code: ${code}`, 404)
        }
        const comp_invoices = await db.query(`SELECT * FROM invoices WHERE comp_code = $1`, [code])
        const comp_industries = await db.query(`SELECT * FROM industries WHERE comp_code = $1`, [code])
        return res.json({company: results.rows[0], invoices: comp_invoices.rows, industries: comp_industries.rows})
    } catch (e){
        return next (e);
    }
});
router.post('/', async (req, res, next) =>{
    try{
        const {name, description} = req.body;
        const code = slugify(name)
        const results = await db.query('INSERT INTO companies (code, name, description) VALUES ($1,$2,$3) RETURNING (code, name, description)', [code, name, description])
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