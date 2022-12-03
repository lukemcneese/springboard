### Conceptual Exercise

Answer the following questions below:

- What is a JWT? - JS Web Token which allows you to provide authorization after authentication

- What is the signature portion of the JWT?  What does it do? - it ensures that the token is generated from the app's server, somthing of a local salt

- If a JWT is intercepted, can the attacker see what's inside the payload? Yes - it is encoded, but not encrypted

- How can you implement authentication with a JWT?  Describe how it works at a high level. Three variables are required to sign a token, payload, secret key, and any JWT options. you pass that into a sign method

- Compare and contrast unit, integration and end-to-end tests. Unit test, test indivudualy functionality of a function, class or block of code. Intergration test involve multiple functions or classes, or the database or front end, two or more parts of the app. Where end to end test, will take data from the front end to the api, to the db and back or any other complete worlflow of an app

- What is a mock? What are some things you would mock? - mock is used to immidate a service working, for example an Api that your applicaiton makes calls to may not be up all the time, you can mock sample results in your testing framework for integration and unit test, but when you are performing end to end test you should use the actual API. 

- What is continuous integration? - is integrating the code often into the entire codef base to ensure that your additionally functionality is not breaking other services.

- What is an environment variable and what are they used for? - used for setting the database for production vs development you can also setup flags for running commands so that they are automically ran. 

- What is TDD? What are some benefits and drawbacks? Test Driven Development, where test are are written first before fucntionality, slow to get a "working" prototype for baseline functionality, but in the long run applications should have edge cases handled quickly

- What is the value of using JSONSchema for validation? - Removes data validation from your functions logic, so that the function can just have one "function" that same validation can be used multiple places and mainted in one easy to read place. 

- What are some ways to decide which code to test? - All code should be tested, but it is critical to test base functionality and edge cases. 

- What does `RETURNING` do in SQL? When would you use it? - it provides a return of a successful SQL query, often durring an insert you might need to return an ID. 

- What are some differences between Web Sockets and HTTP? - HTTP is a request response and termination of an interaction between a client and server, the wb socket then provides a continious connection and conversation between the client and server

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)? I am more comfortable with python over js in general so when we started the course in JS it was a relief to get to python. I think the code is cleaner in flask. I found it easier to remember how get the parameters out of the header and body in express than in flask. the power of the queue of request you can use through express using .next seams like it can be used in alot of different ways. 
