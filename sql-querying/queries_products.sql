-- Comments in SQL Start with dash-dash --
-- Insert Chair
INSERT INTO products (name,price,can_be_returned) VALUES ('chair',44.00,false);
-- Insert Stool
INSERT INTO products (name,price,can_be_returned) VALUES ('stool',25.99,true);
-- Insert Table
INSERT INTO products (name,price,can_be_returned) VALUES ('table',124.00,false);
-- Display all columns and rows products
SELECT * FROM products;
-- Display name of all products
SELECT name FROM products;
-- Display name and price of all products
SELECT name, price FROM products;
-- Insert Desk
INSERT INTO products (name,price,can_be_returned) VALUES ('desk',199.00,false);
-- Show the products that can be returned
SELECT * FROM products WHERE can_be_returned = true;
-- Show the products that are less than $44.00
SELECT * FROM products WHERE price < 44.00;
-- Show the products that are between 22.50 and 99.00 inclusive
SELECT * FROM products WHERE price BETWEEN 22.50 AND 99.00;
-- apply a $20.00 Discount
UPDATE products SET price = price-20;
-- remove the products that are less than $25.00
DELETE FROM products WHERE price <25;
-- apply a $20.00 price increase
UPDATE products SET price = price +20;
--- Change all products to indicate that they can be returned
UPDATE products SET can_be_returned=true;