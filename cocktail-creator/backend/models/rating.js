"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");

class Rating{
   /** Create a rating (from data), update db, return new rating data.
   *
   * data should be { cocktailId, rating, username}
   *
   * Returns { id, cocktailId, rating, username}
   **/

   static async create(data){
    const result = await db.query(
        `INSERT INTO ratings (rating,
                              username,
                              cocktail_id)
         VALUES ($1, $2, $3)
         RETURNING id, rating, username, cocktail_id AS "cocktailId"`,
      [
        data.rating,
        data.username,
        data.cocktailId,
      ]);
    let rating = result.rows[0];

    return rating;
   }
   static async getUsersRatings(username){
       const result = await db.query(
           ` SELECT id,
                    cocktail_id AS "cocktailId",
                    rating,
                    username
            FROM ratings
            WHERE username = $1`, [username]);
       return result.rows;
   }
   static async get(id){
    const result = await db.query(
        ` SELECT id,
                 cocktail_id AS "cocktailId",
                 rating,
                 username
         FROM ratings
         WHERE id = $1`, [id]);
    return result.rows[0];
   }

   static async getUserCocktailRating({ cocktailId, username}){
    const result = await db.query(
      ` SELECT id,
              cocktail_id AS "cocktailId",
              rating,
              username
      FROM ratings
      WHERE (cocktail_id = $1 AND
            username = $2)`, [cocktailId,username]);
    return result.rows[0];
  }


   static async update({id, rating}){
    const result = await db.query(
        ` UPDATE ratings
          SET rating = $1
          WHERE id = $2
          RETURNING id,
                    cocktail_id AS "cocktailId",
                    rating,
                    username`, [rating,id]);
    const newRating = result.rows[0];
    if (!newRating) throw new NotFoundError(`No Rating: ${id}`)
    return newRating;

   }

   static async remove(id){
    const result = await db.query(
            `DELETE
            FROM ratings
            WHERE id = $1
            RETURNING id`, [id]);
    const rating = result.rows[0];

    if (!rating) throw new NotFoundError(`No rating: ${id}`);
    }
}
module.exports = Rating;