### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router? - allows you to have a "multi-page" application within one request, it allows history to be added to the browser so the back and forward button will work as well as resolve request locally on the client

- What is a single page application? - application that loads in a single request and might return most of the application in one request a few additional data request calls may be made after the intial load based on the user inputs

- What are some differences between client side and server side routing? client side routing happens on the client side and only goes back to the server for API calls instead of going back to the server for every request based on the user input

- What are two ways of handling redirects with React Router? When would you use each? Links and Routes, Links link to a specific route or external link and routes are interal request. 

- What are two different ways to handle page-not-found user experiences using React Router? At the end of your switch/routes block you have a page that resolves if no other page is found. the next one is intentially throw 404 errors from routes based on processing the data so the route resolves and then throws the 404 based on the input

- How do you grab URL parameters from within a component using React Router? .useParams

- What is context in React? When would you use it? is the "global" data or scope data based either through hooks or params

- Describe some differences between class-based components and function components in React. class based 

- What are some of the problems that hooks were designed to solve?
  context and prop drilling, where params were passed down from grandparent to grandchildren for simple CRUD operations on  a set of data