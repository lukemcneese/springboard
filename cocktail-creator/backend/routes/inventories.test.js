"use strict";

const request = require("supertest");

const app = require("../app");


const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  nonUserToken,
  testInventoryIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /inventories */


describe("POST /users/:username/inventories", function () {
    test("ok for user", async function () {
      const resp = await request(app)
          .post(`/users/u1/inventories`)
          .send({
            ingredient: "Firewater", 
            quantity: 1,
            username: "u1",
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(201);
      expect(resp.body).toEqual({
        inventory: {
          id: expect.any(Number),
          ingredient: "Firewater", 
          quantity: 1,
          username: "u1",
        },
      });
    });
  
    test("unauth for nonUser", async function () {
      const resp = await request(app)
        .post(`/users/u1/inventories`)
        .send({
            ingredient: "Firewater", 
            quantity: 1,
            username: "u1",
        })
        .set("authorization", `Bearer ${nonUserToken}`);
      expect(resp.statusCode).toEqual(401);
    });
  
    test("bad request with missing data", async function () {
      const resp = await request(app)
          .post(`/users/u1/inventories`)
          .send({
            username: "u1",
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(400);
    });
  
    test("bad request with invalid data", async function () {
      const resp = await request(app)
          .post(`/users/u1/inventories`)
          .send({
            ingredient: "Firewater", 
            quantity: "not a number",
            username: "u1",
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(400);
    });
});

/************************************** GET /inventories */
describe("GET users/:username/inventories/", function () {
    test("works", async function () {
      const resp = await request(app)
        .get(`/users/u1/inventories`)
        .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({
        inventories: [{
          id: testInventoryIds[0],
          ingredient:'Gin',
          quantity: 5,
          username: "u1",
        },
        {
          id: testInventoryIds[2],
          ingredient: 'Scotch',
          quantity: 10,
          username: "u1",
        },
        {
          id: testInventoryIds[4],
          ingredient:'Bourbon',
          quantity: 1,
          username: "u1",
        }
        ]});
    });
    test("unauth for nonUser", async function () {
      const resp = await request(app)
          .get(`/users/u1/inventories`)
          .set("authorization", `Bearer ${nonUserToken}`);
      expect(resp.statusCode).toEqual(401);
    });

    test("unauth for another User", async function () {
        const resp = await request(app)
            .get(`/users/u1/inventories`)
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(401);
      });
  
    test("not found on no such inventory", async function () {
      const resp = await request(app)
          .patch(`/users/nonUser/inventories`)
          .set("authorization", `Bearer ${nonUserToken}`);
      expect(resp.statusCode).toEqual(404);
    });

  });



/************************************** GET /inventories/ingredient/:cocktailID */

/** GET /ingredient/[ingredient] =>
 *   { inventory: { id, ingredient, quantity, username } }
 *
 * Authorization required: ensureUser
 */

 describe("GET users/:username/inventories/ingredient/:ingredient", function () {
    test("works", async function () {
      const resp = await request(app)
        .get(`/users/u1/inventories/ingredient/Gin`)
        .set("authorization", `Bearer ${u1Token}`);
      expect(resp.body).toEqual({
        inventory: {
          id: testInventoryIds[0],
          ingredient: 'Gin',
          quantity: 5,
          username: "u1",
        }
      });
    });
    test("not found if no inventory", async function () {
        const resp = await request(app)
          .get(`/users/u1/inventories/ingredient/1715`)
          .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(400);
      });
  });

  /************************************** PATCH /inventories/:id */

describe("PATCH users/:username/inventories/:id", function () {
    test("works for user", async function () {
      const resp = await request(app)
          .patch(`/users/u1/inventories/${testInventoryIds[0]}`)
          .send({
            quantity: 1,
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.body).toEqual({
        inventory: {
          id: testInventoryIds[0],
          ingredient: 'Gin',
          quantity: 1,
          username: "u1"
        },
      });
    });
    test("works for quantity to 0", async function () {
        const resp = await request(app)
            .patch(`/users/u1/inventories/${testInventoryIds[0]}`)
            .send({
              quantity: 0,
            })
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
          inventory: {
            id: testInventoryIds[0],
            ingredient: 'Gin',
            quantity: 0,
            username: "u1"
          },
        });
      });
  
    test("unauth for nonUser", async function () {
      const resp = await request(app)
          .patch(`/users/u1/inventories/${testInventoryIds[0]}`)
          .send({
            quantity: 4,
          })
          .set("authorization", `Bearer ${nonUserToken}`);
      expect(resp.statusCode).toEqual(401);
    });
  
    test("not found on no such rating", async function () {
      const resp = await request(app)
          .patch(`/users/u1/inventories/0`)
          .send({
            quantity: 5,
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(404);
    });
  
    test("bad request on username change attempt", async function () {
      const resp = await request(app)
          .patch(`/users/u1/inventories/${testInventoryIds[0]}`)
          .send({
            username: "anotherUser",
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(400);
    });
  
    test("bad request with invalid data", async function () {
      const resp = await request(app)
          .patch(`/users/u1/inventories/${testInventoryIds[0]}`)
          .send({
            quantity: "not-a-number",
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(400);
    });
  });

  /************************************** DELETE /inventories/:id */

describe("DELETE /users/:username/inventories/:id", function () {
    test("works for user", async function () {
      const resp = await request(app)
          .delete(`/users/u1/inventories/${testInventoryIds[0]}`)
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.body).toEqual({ deleted: testInventoryIds[0] });
      expect(resp.statusCode).toEqual(200);
    });
  
    test("unauth for nonUser", async function () {
      const resp = await request(app)
          .delete(`/users/u1/inventories/${testInventoryIds[0]}`)
          .set("authorization", `Bearer ${nonUserToken}`);
      expect(resp.statusCode).toEqual(401);
    });
  
  
    test("not found for no such rating", async function () {
      const resp = await request(app)
          .delete(`/users/u1/inventories/0`)
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(404);
    });
  });