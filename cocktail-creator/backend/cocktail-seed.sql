INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'test@user.com'),
       ('lukemcneese',
        '$2b$12$CHnZjoKTkOYOGbJ6zhHmcO5ynZKL4wpPtPZNrBGSJcgzAAI2.RZ6O',
        'Luke',
        'McNeese!',
        'lukemcneese@gmail.com');

INSERT INTO inventory (ingredient, quantity,username)
VALUES  ('Gin'     ,5,  'testuser'),
        ('Scotch'  ,3,  'lukemcneese'),
        ('Scotch'  ,10, 'testuser'),
        ('Bourbon' ,2,  'lukemcneese'),
        ('Bourbon' ,1,  'testuser')