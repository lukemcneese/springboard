"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureUser, ensureLoggedIn } = require("../auth");
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
 router.post("/", ensureUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, ratingNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const rating = await Rating.create(req.body);
    return res.status(201).json({ rating });
  } catch (err) {
    return next(err);
  }
});


/** GET /[id] =>
 *   { rating: { id, cokctailId, rating, username } }
 *
 * Authorization required: ensureLoggedIn
 */
 router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const rating = await Rating.get(req.params.id);
    if (!rating) throw new BadRequestError("Rating ID not Found")
    return res.json({ rating });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { ratings: [ { id, cokctailId, rating, username }, ...] }
 *
 * Authorization required: ensureUser
 */
 router.get("/", ensureUser, async function (req, res, next) {
  try {
    const ratings = await Rating.getUsersRatings(req.params.username);
    if (!ratings) throw new BadRequestError("No Ratings found for User")
    return res.json({ ratings });
  } catch (err) {
    return next(err);
  }
});




/** PATCH /[id]  { rating } => { rating }
 *
 *
 * Returns { id, cocktailId, rating, username}
 *
 * Authorization required: ensureUser
 */

 router.patch("/:id", ensureUser, async function (req, res, next) {
    try {

        const validator = jsonschema.validate(req.body, ratingUpdateSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadRequestError(errs);
        }
    const rating = await Rating.update({id:req.params.id, rating:req.body.rating});
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