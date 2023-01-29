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