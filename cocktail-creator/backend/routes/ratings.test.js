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
  testRatingIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /ratings */


describe("POST /users/:username/ratings", function () {
  test("ok for user", async function () {
    const resp = await request(app)
        .post(`/users/u1/ratings`)
        .send({
          username: "u1",
          rating: 3,
          cocktailId: 10,
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      rating: {
        id: expect.any(Number),
        username: "u1",
        rating: 3,
        cocktailId: 10,
      },
    });
  });

  test("unauth for nonUser", async function () {
    const resp = await request(app)
      .post(`/users/u1/ratings`)
      .send({
        username: "u1",
        rating: 3,
        cocktailId: 10,
      })
      .set("authorization", `Bearer ${nonUserToken}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post(`/users/u1/ratings`)
        .send({
          username: "u1",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post(`/users/u1/ratings`)
        .send({
          username: "u1",
          rating: "not a number",
          cocktailId: 10,
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

});
/************************************** GET /ratings/cocktails/:cocktailID */

/** GET /cocktails/[cocktailId] =>
 *   { rating: { id, cocktailId, rating, username } }
 *
 * Authorization required: ensureUser
 */

 describe("GET users/:username/ratings/cocktails/:cocktailId", function () {
  test("works", async function () {
    const resp = await request(app)
      .get(`/users/u1/ratings/cocktails/17222`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      rating: {
        id: testRatingIds[0],
        cocktailId: 17222,
        username: "u1",
        rating: 4
      }
    });
  });
});



/************************************** GET /ratings/:id */
describe("GET users/:username/ratings/:id", function () {
  test("works", async function () {
    const resp = await request(app)
      .get(`/users/u1/ratings/${testRatingIds[0]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      rating: {
        id: testRatingIds[0],
        cocktailId: 17222,
        username: "u1",
        rating: 4
      }
    });
  });

  test("not found for no such rating", async function () {
    const resp = await request(app).get(`/users/u1/ratings/0`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});


/************************************** GET /ratings */
describe("GET users/:username/ratings/", function () {
  test("works", async function () {
    const resp = await request(app)
      .get(`/users/u1/ratings`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      ratings: [{
        id: testRatingIds[0],
        cocktailId: 17222,
        username: "u1",
        rating: 4
      },
      {
        id: testRatingIds[2],
        cocktailId: 13501,
        username: "u1",
        rating: 5
      },
      {
        id: testRatingIds[4],
        cocktailId: 15721,
        username: "u1",
        rating: 1
      }
      ]
    });
  });
  test("unauth for nonUser", async function () {
    const resp = await request(app)
        .get(`/users/u1/ratings`)
        .set("authorization", `Bearer ${nonUserToken}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such rating", async function () {
    const resp = await request(app)
        .patch(`/users/nonUser/ratings`)
        .set("authorization", `Bearer ${nonUserToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});


/************************************** PATCH /ratings/:id */

describe("PATCH users/:username/ratings/:id", function () {
    test("works for user", async function () {
      const resp = await request(app)
          .patch(`/users/u1/ratings/${testRatingIds[0]}`)
          .send({
            rating: 0,
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.body).toEqual({
        rating: {
          id: expect.any(Number),
          cocktailId: 17222,
          rating: 0,
          username: "u1",
        },
      });
    });
  
    test("unauth for nonUser", async function () {
      const resp = await request(app)
          .patch(`/users/u1/ratings/${testRatingIds[0]}`)
          .send({
            rating: 4,
          })
          .set("authorization", `Bearer ${nonUserToken}`);
      expect(resp.statusCode).toEqual(401);
    });
  
    test("not found on no such rating", async function () {
      const resp = await request(app)
          .patch(`/users/u1/ratings/0`)
          .send({
            rating: 5,
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(404);
    });
  
    test("bad request on username change attempt", async function () {
      const resp = await request(app)
          .patch(`/users/u1/ratings/${testRatingIds[0]}`)
          .send({
            username: "anotherUser",
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(400);
    });
  
    test("bad request with invalid data", async function () {
      const resp = await request(app)
          .patch(`/users/u1/ratings/${testRatingIds[0]}`)
          .send({
            rating: "not-a-number",
          })
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(400);
    });
  });
/************************************** DELETE /ratings/:id */

describe("DELETE /users/:username/ratings/:id", function () {
    test("works for user", async function () {
      const resp = await request(app)
          .delete(`/users/u1/ratings/${testRatingIds[0]}`)
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.body).toEqual({ deleted: testRatingIds[0] });
      expect(resp.statusCode).toEqual(200);
    });
  
    test("unauth for nonUser", async function () {
      const resp = await request(app)
          .delete(`/users/u1/ratings/${testRatingIds[0]}`)
          .set("authorization", `Bearer ${nonUserToken}`);
      expect(resp.statusCode).toEqual(401);
    });
  
  
    test("not found for no such rating", async function () {
      const resp = await request(app)
          .delete(`/users/u1/ratings/0`)
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toEqual(404);
    });
  });