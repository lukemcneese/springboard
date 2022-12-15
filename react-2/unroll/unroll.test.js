const unroll = require("./unroll");
const square = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];
const square_unrolled = [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]

const smallerSquare = [
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"]
];
const smallerSquare_unrolled = ["a", "b", "c", "f", "i", "h", "g", "d", "e"]


describe("#unroll", function () {
  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });
  it("should unroll the test square", function() {
    expect(unroll(square)).toEqual(square_unrolled)
  });
  it("should unroll the smaller square", function() {
    expect(unroll(smallerSquare)).toEqual(smallerSquare_unrolled)
  });

});
