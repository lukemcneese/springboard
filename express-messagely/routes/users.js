const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ExpressError = require("../expressError");
const db = require("../db");
const {ensureLoggedIn, ensureAdmin, ensureCorrectUser} = require("../middleware/auth");
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");
const User = require("../models/user");
/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get("/", ensureLoggedIn, async function (req, res, next){
    try{
        let users = await User.all();
        return res.json({users});
    }   
    catch (e){
        return next(e);
    }
});

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
 router.get("/:username", ensureCorrectUser, async function (req, res, next){
    try{
        let users = await User.get(req.params.username);
        return res.json({users});
    }   
    catch (e){
        return next(e);
    }
});

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/to", ensureCorrectUser, async function (req, res, next){
    try{
        let messages = await User.messagesTo(req.params.username);
        return res.json({messages});
    }   
    catch (e){
        return next(e);
    }
});

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
 router.get("/:username/from", ensureCorrectUser, async function (req, res, next){
    try{
        let messages = await User.messagesFrom(req.params.username);
        return res.json({messages});
    }   
    catch (e){
        return next(e);
    }
});


 module.exports = router;
