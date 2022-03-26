### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?  
  JS is interpeted by the browser which happens on the client side, python operates on the server, you have to declare variables in JS.
- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.
  * dict.get("c")
  * if c in dict

- What is a unit test?  
  A unit test is designed to test the functionality of that function against an expected result and only testing that functions functionality

- What is an integration test?  
  An integration test is dseigned to test the ability for the service/program to run perform a series of tasks where functions work together to accomplish an outcome

- What is the role of web application framework, like Flask?  
  A web framework exist to abstract the details of the client server interaction so functionality of the services and logic can be focused on. 

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?  
 Query parameters are more used for sorting and filtering rather that url would be accessing a cateogory or specfic resource 

- How do you collect data from a URL placeholder parameter using Flask?  
  Use the <> to createa variable that you access inside the function <var> then inside the funciton var++

- How do you collect data from the query string using Flask?  
  Come in as arguments to the function

- How do you collect data from the body of the request using Flask?
  Request.args
- What is a cookie and what kinds of things are they commonly used for?  
  Cookies are data stored on the client side, a smaller ammount of data compared to sessions, they store data about the user, this storage is less secure than sessions

- What is the session object in Flask?  
  The session object works like a dictionary where you can store data that will live as long as the tab is open, part of this informaiton can be sent to the server for storage and then sent back to the client at a later time

- What does Flask's `jsonify()` do?  
  Turns an object/data structure into a json formatted string
