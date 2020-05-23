DROP DATABASE IF EXISTS games;
CREATE DATABASE games;
\c games;
DROP TABLE IF EXISTS games;
CREATE TABLE games (
  id INT,
  name VARCHAR(100),
  details VARCHAR(3000),
  images VARCHAR(500)
);