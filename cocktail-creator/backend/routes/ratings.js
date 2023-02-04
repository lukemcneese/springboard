"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureUser } = require("../auth");
const Rating = require("../models/rating");
const ratingNewSchema = require("../schemas/ratingNew.json");
const ratingUpdateSchema = require("../schemas/ratingUpdate.json")

const router = express.Router({ mergeParams: true });


/** POST / { rating } => { rating }
 *
 * rating should be { cocktailId, rating, username}
 *
 * Returns { id, cocktailId, rating, username}
 *
 * Authorization required: ensureUser
 */

/** GET /[username] =>
 *   { ratings: [ { id, cokctailId, rating, username }, ...] }
 *
 * Authorization required: ensureLoggedIn
 */

/** PATCH /[id]  { rating } => { rating }
 *
 *
 * Returns { id, cocktailId, rating, username}
 *
 * Authorization required: ensureUser
 */

 router.patch("/:id", ensureUser, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(+req.body, ratingUpdateSchema);
        if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
    }

    const rating = await Rating.update({id:req.params.id, rating:+req.body});
    return res.json({ rating });
    } catch (err) {
      return next(err);
    }
  });

/** DELETE /[handle]=>  { deleted: id }
 *
 * Authorization required: ensureUser
 */

 router.delete("/:id", ensureUser, async function (req, res, next) {
    try {
        await Rating.remove(req.params.id);
        return res.json({ deleted: +req.params.id });
    } catch (err) {
      return next(err);
    }
  });

 module.exports = router;