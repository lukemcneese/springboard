const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Inventory = require("./inventory.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testInventoryIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("create", function () {
    let newInventory = {
      ingredient: "Rum",
      quantity: 3,
      username: "u1"
    };
    test("works", async function () {
        let inventory = await Inventory.create(newInventory);
        expect(inventory).toEqual({
          ...newInventory,
          id: expect.any(Number),
        });
      });
});

describe("getUsersInventorys", function(){
    test("works", async function(){
        let inventorys = await Inventory.getUsersInventory("u1");
        expect(inventorys.length).toEqual(3)
        inventorys = await Inventory.getUsersInventory("u2");
        expect(inventorys.length).toEqual(2)
    })
});

describe("getUserQuantity", function(){
  test("works", async function(){
      let inventory = await Inventory.getUserQuantity({username:"u1",ingredient: "Scotch"});
      expect(inventory.quantity).toEqual(10)
  })
});


describe("update", function(){
    const newQuantity = 4;
    test("works", async function(){
        let i = await Inventory.update({id: testInventoryIds[0],quantity:newQuantity});
        console.log(i);
        expect(i).toEqual({
            id: testInventoryIds[0],
            ingredient: 'Gin',
            quantity: newQuantity,
            username: "u1",
        })
    })
});

describe("remove", function () {
    test("works", async function () {
      await Inventory.remove(testInventoryIds[0]);
      const res = await db.query(
          "SELECT id FROM inventory WHERE id=$1", [testInventoryIds[0]]);
      expect(res.rows.length).toEqual(0);
    });
  
    test("not found if no such job", async function () {
      try {
        await Inventory.remove(0);
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  });
  