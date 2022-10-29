### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  asyn/await ensure that the data that is going to be returned from a api call will be returned before it is used 
- What is a Promise?
  a placeholder for a return value from a api call that will eventually be reassigned to the returned value

- What are the differences between an async function and a regular function?
  a async function may have to await a response from an api call before continueing the execution of the function, a regualr funciton sequetionally executes the items within it

- What is the difference between Node.js and Express.js?
  express is a module that can be used within client side JS one implementation which is node.js that can be used to handle route request

- What is the error-first callback pattern?
  check for your error and return as soon as an error is found before you execute the rest of the items in that function

- What is middleware?
  routes that can be ran everytime a set of routes are called

- What does the `next` function do?
  continues execution onto the next applicable route

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  the variable names are not consistent with the requested values
  the request could be made in parallel because the calls are not dependent on the results using promse.all


```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
