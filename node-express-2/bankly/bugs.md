BUG 1 - data.sql added a check to ensure there was an @ symbol and it wasnt the first char
Resolution - added jsonschema to validate email address

BUG 2 - user.js getall is supposed to jsut return username, first, last it was returning everything

BUG 3 - user.js getall asked for username and password in the function, but the authorization is handled in the route not on the model
Resolution - delete from paramater list
no real test

BUG 4 - Returning Password in password in user object
user.js user.authincate was not deleting the password from the object before it was returned to the route
user.js user.register no need to return the password in the user object to the route
user.js update was returning the password on the user object to the route, deleted from object.

BUG 5 - allowing the updating of items other than first_name, last_name, phone, email
addded a schema to validate, removed the route validation because the route was validating as an and and needed an OR which the if statement was checking inside the route



minor bugs:
app.js module.exports was twice once on 36 and 38
auth.js changed user on line 20 from let to const
auth.js on line 41 there is no await on the call to User.authenticate
user.js getall was not throwing the execption it was just creating it, added throw
users.js no await before calling the user.delete method

