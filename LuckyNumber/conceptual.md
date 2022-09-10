### Conceptual Exercise

Answer the following questions below:

- What is RESTful routing?
    Allows Create Read Update Delete(CRUD) operations with standard routes, instead of a post request to a delte route it should be a DELETE request to the same route as teh rest of the CRUD resources
- What is a resource?
    resource is a set of data that can be created, read, updated, deleted
- When building a JSON API why do you not include routes to render a form that when submitted creates a new user?
    because you are just returning a dictionary essentially with the data requested. Its serving as an API not a server, the client can do what it wants with that data

- What does idempotent mean? Which HTTP verbs are idempotent?
    idempotent does not impact the data/resource
- What is the difference between PUT and PATCH?
  Put is updating a whole resource, where patch is just updating some of the values of a resource

- What is one way encryption?
  encryption that takes a string/data and creates a string, that cannot reproduce the oringial string

- What is the purpose of a `salt` when hashing a password?
  further protects yoru data from brute force attacks, so if bcrypt was solved your implementation would not be vulnerable due to your salt not being known from the bad actor

- What is the purpose of the Bcrypt module?
    it creates an easy implementation of the bcrypt hashing algorigthm through not asking the devleoper to preform the actual hash, and providing an object that can be interfaced with
- What is the difference between authorization and authentication?
  authentication is whether a user is who they say are, usually verifed by username/password credentials, authorization is whether that signed in user has the permission the access the given resource
