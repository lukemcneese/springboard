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
  
    // test("unauth for others", async function () {
    //   const resp = await request(app)
    //       .patch(`/users/u1/ratings/${testRatingIds[0]}`)
    //       .send({
    //         rating: 4,
    //       })
    //       .set("authorization", `Bearer ${nonUserToken}`);
    //   expect(resp.statusCode).toEqual(401);
    // });
  
    // test("not found on no such job", async function () {
    //   const resp = await request(app)
    //       .patch(`/users/u1/ratings/0`)
    //       .send({
    //         rating: 5,
    //       })
    //       .set("authorization", `Bearer ${u1Token}`);
    //   expect(resp.statusCode).toEqual(400);
    // });
  
    // test("bad request on username change attempt", async function () {
    //   const resp = await request(app)
    //       .patch(`/users/u1/ratings/${testRatingIds[0]}`)
    //       .send({
    //         username: "anotherUser",
    //       })
    //       .set("authorization", `Bearer ${u1Token}`);
    //   expect(resp.statusCode).toEqual(400);
    // });
  
    // test("bad request with invalid data", async function () {
    //   const resp = await request(app)
    //       .patch(`users/u1/ratings/${testRatingIds[0]}`)
    //       .send({
    //         rating: "not-a-number",
    //       })
    //       .set("authorization", `Bearer ${u1Token}`);
    //   expect(resp.statusCode).toEqual(400);
    // });
  });


describe("DELETE /users/:username/ratings/:id", function () {
    test("works for user", async function () {
      const resp = await request(app)
          .delete(`/users/u1/ratings/${testRatingIds[0]}`)
          .set("authorization", `Bearer ${u1Token}`);
      expect(resp.body).toEqual({ deleted: testRatingIds[0] });
      expect(resp.statusCode).toEqual(200);
    });
  
    test("unauth for others", async function () {
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