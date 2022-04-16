-- from the terminal run:
-- psql < soccer.sql

DROP DATABASE IF EXISTS soccer;

CREATE DATABASE soccer;

\c soccer
--teams
CREATE TABLE teams
(
    id SERIAL PRIMARY KEY,
    team_name text NOT NULL
);
--players
CREATE TABLE players
(
    id SERIAL PRIMARY KEY,
    player_name text NOT NULL,
    team INTEGER REFERENCES teams
);
--match
CREATE TABLE matches
(
    id SERIAL PRIMARY KEY,
    home_team INTEGER REFERENCES teams,
    visiting_team INTEGER REFERENCES teams,
    winner INTEGER REFERENCES teams
);
--goals
CREATE TABLE goals
(
    id SERIAL PRIMARY KEY,
    goal_time TIMESTAMP NOT NULL,
    match INTEGER REFERENCES matches,
    team INTEGER REFERENCES teams,
    player INTEGER REFERENCES players
);
--referees table
CREATE TABLE referees
(
    id SERIAL PRIMARY KEY,
    ref_name text NOT NULL
);
--matches and referes table
CREATE TABLE matches_referees
(
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches,
    ref_id INTEGER REFERENCES referees
);
CREATE TABLE season
(
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

--Rankings could be determined through a select of all of the matches and count on the winners
--SELECT team_name, count(*) FROM matches GROUP BY winners asc;
-- Tie breaker is probably on goal count SELECT count(*) FROM goals GROUP BY teams asc;