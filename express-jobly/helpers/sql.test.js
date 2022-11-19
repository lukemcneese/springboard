const { BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("./sql");

const jsToSql = {
    firstName: "first_name",
    lastName: "last_name",
    isAdmin: "is_admin"
  };

describe("sqlpartialUpdate", function () {
    test("works: two values", function () {
        const dataToUpdate = {firstName: 'Aliya', age: 32}
        const payload = sqlForPartialUpdate(dataToUpdate,jsToSql);
        expect(payload).toEqual({
            setCols: ['"first_name"=$1', '"age"=$2'],
            values:  ['Aliya', 32]
        })});
  
    test("works: one value", function () {
        const dataToUpdate = {firstname : 'Aliya'}
        const payload = sqlForPartialUpdate(dataToUpdate,jsToSql);
        expect(payload).toEqual({
            setCols: ['"first_name"=$1'],
            values: ["Aliya",]
        })});
  
    test("works: no value", function () {
        try {
            const dataToUpdate = {}
            sqlForPartialUpdate(dataToUpdate,jsToSql);
            fail();
          } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
          }
    });
  });
  