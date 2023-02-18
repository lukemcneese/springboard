"use strict";

/** Routes for inventorys. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureUser} = require("../auth");
const Inventory = require("../models/inventory");
const inventoryNewSchema = require("../schemas/inventoryNew.json");
const inventoryUpdateSchema = require("../schemas/inventoryUpdate.json")

const router = express.Router({ mergeParams: true });


/** POST / { inventory } => { inventory }
 *
 * inventory should be { ingredient, quantity, username}
 *
 * Returns { id, ingredient, quantity, username}
 *
 * Authorization required: ensureUser
 */
 router.post("/", ensureUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, inventoryNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const inventory = await Inventory.create(req.body);
    return res.status(201).json({ inventory });
  } catch (err) {
    return next(err);
  }
});



/** GET / =>
 *   { inventories: [ { id, ingredient, quantity, username }, ...] }
 *
 * Authorization required: ensureUser
 */
 router.get("/", ensureUser, async function (req, res, next) {
  try {
    const inventories = await Inventory.getUsersInventory(req.params.username);
    //if (!inventories) throw new BadRequestError("No inventories found for User")
    return res.json({ inventories });
  } catch (err) {
    return next(err);
  }
});

/** GET /ingredient/[ingredient] =>
 *   { inventory: { id, ingredient, quantity, username } }
 *
 * Authorization required: ensureUser
 */
 router.get("/ingredient/:ingredient", ensureUser, async function (req, res, next) {
    try {
      const inventory = await Inventory.getUserQuantity({
          ingredient:req.params.ingredient, 
          username:req.params.username
        });
      if (!inventory) throw new BadRequestError(`No Inventory for ${req.params.ingredient} found`)
      return res.json({ inventory });
    } catch (err) {
      return next(err);
    }
  });



/** PATCH /[id]  { quantity } => { inventory }
 *
 *
 * Returns { id, ingredient, quantity, username}
 *
 * Authorization required: ensureUser
 */

 router.patch("/:id", ensureUser, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, inventoryUpdateSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadRequestError(errs);
        }
    const inventory = await Inventory.update({id:req.params.id, quantity:req.body.quantity});
    return res.json({ inventory });
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
        await Inventory.remove(req.params.id);
        return res.json({ deleted: +req.params.id });
    } catch (err) {
      return next(err);
    }
  });

 module.exports = router;