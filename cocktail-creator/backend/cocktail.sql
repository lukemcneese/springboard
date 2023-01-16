\echo 'Delete and recreate cocktail db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE cocktail;
CREATE DATABASE cocktail;
\connect cocktail

\i cocktail-schema.sql
\i cocktail-seed.sql

\echo 'Delete and recreate cocktail_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE cocktail_test;
CREATE DATABASE cocktail_test;
\connect cocktail_test

\i cocktail-schema.sql
