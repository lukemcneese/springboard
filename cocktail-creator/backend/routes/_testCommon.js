"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Rating = require("../models/rating");
const Inventory =require("../models/inventory");
const { createToken } = require("../helpers/tokens");

const testRatingIds = [];
const testInventoryIds = [];


async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM ratings");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM inventory");


  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1"
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2"
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3"
  });
  testRatingIds[0] = (await Rating.create(
    { cocktailId: 17222, username: "u1",rating: 4 })).id;
  testRatingIds[1] = (await Rating.create(
      { cocktailId: 17222, username: "u2",rating: 2 })).id;
  testRatingIds[2] = (await Rating.create(
      { cocktailId: 13501, username: "u1", rating: 5 })).id;
  testRatingIds[3] = (await Rating.create(
      { cocktailId: 13501, username: "u2", rating: 3 })).id;
  testRatingIds[4] = (await Rating.create(
      { cocktailId: 15721, username: "u1", rating: 1 })).id;

  testInventoryIds[0] = (await Inventory.create(
    { ingredient: 'Gin',quantity:5, username: "u1"})).id;
  testInventoryIds[1] = (await Inventory.create(
      { ingredient: 'Scotch',quantity:3, username: "u2"})).id;
  testInventoryIds[2] = (await Inventory.create(
      { ingredient: 'Scotch',quantity:10, username: "u1"})).id;
  testInventoryIds[3] = (await Inventory.create(
      { ingredient: 'Bourbon',quantity:2, username: "u2"})).id;
  testInventoryIds[4] = (await Inventory.create(
      { ingredient: 'Bourbon',quantity:1, username: "u1"})).id;

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


const u1Token = createToken({ username: "u1"});
const u2Token = createToken({ username: "u2"});
const nonUserToken = createToken({username: "nonUser"});


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  nonUserToken,
  testRatingIds,
  testInventoryIds
};
