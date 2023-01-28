CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  cocktail_id INTEGER NOT NULL,
  rating INTEGER CHECK (rating >= 0),
  username VARCHAR(25) REFERENCES users ON DELETE CASCADE
);
