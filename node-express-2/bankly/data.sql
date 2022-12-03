
CREATE TABLE users (
    username text PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL
    CHECK (position('@' IN email) > 1),
    phone text NOT NULL,
    password text NOT NULL,
    admin boolean NOT NULL DEFAULT false
);

