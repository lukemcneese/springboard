"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");

class inventory{
   /** Create a inventory (from data), update db, return new inventory data.
   *
   * data should be { ingredient, quantity, username}
   *
   * Returns { ingredient, quantity, username}
   **/

   static async create(data){
    const result = await db.query(
        `INSERT INTO inventory (ingredient,
                                quantity,
                                username)
         VALUES ($1, $2, $3)
         RETURNING id, ingredient, quantity, username`,
      [
        data.ingredient,
        data.quantity,
        data.username,
      ]);
    let inventory = result.rows[0];

    return inventory;
   }
   static async getUsersInventory(username){
       const result = await db.query(
           ` SELECT id,
                    ingredient,
                    quantity,
                    username
            FROM inventory
            WHERE username = $1`, [username]);
       return result.rows;
   }
   static async getUserQuantity({ingredient, username}){
    const result = await db.query(
            `SELECT id,
                 ingredient,
                 quantity,
                 username
            FROM inventory
            WHERE (ingredient = $1 
            AND       username = $2)`, [ingredient,username]);
    return result.rows[0];
   }

   static async update({quantity, id}){
    const result = await db.query(
        ` UPDATE inventory
          SET quantity = $1
          WHERE id = $2
          RETURNING id,
                    ingredient,
                    quantity,
                    username`, [quantity,id]);
    const newinventory = result.rows[0];
    if (!newinventory) throw new NotFoundError(`No inventory: ${id}`)
    return newinventory;

   }

   static async remove(id){
    const result = await db.query(
            `DELETE
             FROM inventory
             WHERE id = $1
             RETURNING id`, [id]);
    const inventory = result.rows[0];

    if (!inventory) throw new NotFoundError(`No inventory: ${id}`);
    }
}
module.exports = inventory;