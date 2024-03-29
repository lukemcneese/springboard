SELECT * FROM owners LEFT JOIN vehicles on vehicles.owner_id = owners.id; -- write your queries here
SELECT first_name, last_name, count(*) FROM owners JOIN vehicles on vehicles.owner_id = owners.id GROUP BY owners.id ORDER BY first_name asc;
SELECT first_name, last_name, AVG(vehicles.price) as average_price, COUNT(*) FROM owners JOIN vehicles on vehicles.owner_id = owners.id GROUP BY owners.id HAVING count(*)>1 AND AVG(vehicles.price) >10000 ORDER BY first_name desc;



SELECT stars.first_name, stars.last_name, movies.title FROM stars JOIN roles on movie.id = roles.movie_id Join stars on roles.star_id = star.id;