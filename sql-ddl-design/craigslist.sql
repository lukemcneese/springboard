-- from the terminal run:
-- psql < craigslist.sql

DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

--region table
CREATE TABLE regions
(
  id SERIAL PRIMARY KEY,
  region_name text NOT NULL
);
--user table
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    user_name text NOT NULL,
    region_id INTEGER REFERENCES regions
);
-- categories
CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    category_name text NOT NULL
);
--post
CREATE TABLE post
(
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    post_text text NOT NULL,
    user_id INTEGER REFERENCES users,
    posting_location text NOT NULL,
    region INTEGER REFERENCES regions,
    category INTEGER REFERENCES categories
);

