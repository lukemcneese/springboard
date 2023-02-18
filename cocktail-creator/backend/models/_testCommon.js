const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testRatingIds = [];
const testInventoryIds = [];


async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM ratings");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM inventory");


  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);
  const resultsRatings = await db.query(`
      INSERT INTO ratings(cocktail_id,
                          username,
                          rating)
      VALUES  (17222, 'u1', 4),
              (17222, 'u2', 2),
              (13501, 'u1', 5),
              (13501, 'u2', 3),
              (17255, 'u1', 1)
      RETURNING id`);
  testRatingIds.splice(0,0, ...resultsRatings.rows.map(r =>r.id));

  const resultsInventory = await db.query(`
      INSERT INTO inventory(ingredient,
                            quantity,
                            username)
      VALUES  ('Gin'     ,5,  'u1'),
              ('Scotch'  ,3,  'u2'),
              ('Scotch'  ,10, 'u1'),
              ('Bourbon' ,2,  'u2'),
              ('Bourbon' ,1,  'u1')
      RETURNING id;`);
    testInventoryIds.splice(0,0, ...resultsInventory.rows.map(i =>i.id));
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testRatingIds,
  testInventoryIds
};