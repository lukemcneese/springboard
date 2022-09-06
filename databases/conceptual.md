### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL? *PostgreSQL is database that adds some management and interaction features*
  
- What is the difference between SQL and PostgreSQL? *SQL is a standardized lanugage used for CRUD operations on a database, PostgreSQL is an database that implements that language and provides other features*

- In `psql`, how do you connect to a database? `\c databasename`

- What is the difference between `HAVING` and `WHERE`? *where checks a conditional directly against the data, but will not work when data has been aggregated using GROUP, that is when you would using having*

- What is the difference between an `INNER` and `OUTER` join? * Inner joins is the intersection where the data exists in both tables and the matches that are not in both tables are not returned. An outer join returns all the rows from both tables joins where there are matches, but you may have some columns with no data after the join * 

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join? * A left Join It keeps all of the data for the left or table the join is being called from or on. On the other hand the Right join keeps the all the rows from the right table or the target of the join. *

- What is an ORM? What do they do? *ORM or Object relational mapping created a diagram of the schema of the database, it helps visualize how the data is connected.*

- What are some differences between making HTTP requests using AJAX 
  and from the server side using a library like `requests`? *AJAX originates from the client but can preform requests to the server get a response update the clients information as needed. the both can utilize request like post and get.*

- What is CSRF? What is the purpose of the CSRF token? *a CSRF or Cross site request forgery protection ensures the request that is being processed is from the form that it should be from and not from a bad actor. This is done by generating a token when the form is created and references that token with the form is processed*

- What is the purpose of `form.hidden_tag()`? *So the developer can have tags that are associated with the request that are hidden from the user the token that is used to prevent CRSF is one of these items.
