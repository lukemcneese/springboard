const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Rating = require("./rating.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testRatingIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("create", function () {
    let newRating = {
      cocktailId: 14610,
      rating: 3,
      username: "u1"
    };
    test("works", async function () {
        let rating = await Rating.create(newRating);
        expect(rating).toEqual({
          ...newRating,
          id: expect.any(Number),
        });
      });
});
describe("getUsersRatings", function(){
    test("works", async function(){
        let ratings = await Rating.getUsersRatings("u1");
        expect(ratings.length).toEqual(3)
        ratings = await Rating.getUsersRatings("u2");
        expect(ratings.length).toEqual(2)
    })
});

describe("getUserCocktailRating", function(){
  test("works", async function(){
      let rating = await Rating.getUserCocktailRating({username:"u1",cocktailId: 17222});
      expect(rating.rating).toEqual(4)
  })
});

describe("get", function(){
    test("works", async function(){
        let rating = await Rating.get(testRatingIds[0]);
        expect(rating).toEqual({
            id: expect.any(Number),
            rating: expect.any(Number),
            username: "u1",
            cocktailId: expect.any(Number)
        })
    })
});

describe("update", function(){
    const newRating = 4;
    test("works", async function(){
        let r = await Rating.update({id: testRatingIds[0],rating:newRating});
        expect(r).toEqual({
            id: expect.any(Number),
            rating: newRating,
            username: "u1",
            cocktailId: expect.any(Number)
        })
    })
});

describe("remove", function () {
    test("works", async function () {
      await Rating.remove(testRatingIds[0]);
      const res = await db.query(
          "SELECT id FROM ratings WHERE id=$1", [testRatingIds[0]]);
      expect(res.rows.length).toEqual(0);
    });
  
    test("not found if no such job", async function () {
      try {
        await Rating.remove(0);
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  });
  