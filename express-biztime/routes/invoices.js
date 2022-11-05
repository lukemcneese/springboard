const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) =>{
    try{
        const results = await db.query(`SELECT id,comp_code FROM invoices`);
        return res.json({invoices: results.rows})
    } catch (e) {
        return next(e);
    }
});
router.get('/:id', async (req, res, next) =>{
    try{
        const results = await db.query(
        `SELECT i.id, i.amt, i.paid, i.add_date, i.paid_date, c.code, c.name, c.description
        FROM invoices AS i
        LEFT JOIN companies as c
        ON i.comp_code = c.code
        WHERE i.id = $1`,[req.params.id])
        if (results.rows.length === 0){
            throw new ExpressError(`Unable to locate invoice id: ${req.params.id}`, 404)
        }
        const {id, amt, paid, add_date, paid_date, code, name, description} = results.rows[0];
        return res.json({invoice:{id,amt,paid, add_date, paid_date}, company: {code, name, description}})
    } catch (e){
        return next (e);
    }
});
router.post('/', async (req, res, next) =>{
    try{
        const {comp_code, amt} = req.body
        const results = await db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date`,[comp_code, amt]);
        if (results.rows.lentgh === 0){
            throw new ExpressError(`Unable to add invoice `, 404)
        }
        return res.json({invoice:results.rows[0]});
    } catch (e){
        return next (e);
    }
});

router.put('/:id', async (req, res, next) =>{
try{
    const {amt} = req.body
    const results = await db.query(`
    UPDATE invoices SET amt=$1 WHERE id = $2
    RETURNING id, comp_code, amt, paid, add_date, paid_date
    `, [amt,req.params.id]);
    
    if (results.rows.lentgh === 0){
        throw new ExpressError(`Unable to locate invoice `, 404)
    }
    return res.json({invoice:results.rows[0]});
} catch (e){
    return next (e);
}
});

router.delete('/:id', async (req, res, next) =>{
    try{
        const results = await db.query(`
        DELETE FROM invoices
        WHERE id=$1
        RETURNING *`,
        [req.params.id]);
        if (results.rows.lentgh === 0){
            throw new ExpressError(`Unable to add find invoice `, 404)
        }
        return res.json({status:'deleted'});
    } catch (e){
        return next (e);
    }
});



module.exports = router;