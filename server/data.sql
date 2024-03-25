-- This script drops and recreates the database "data", then creates tables and seeds data.

\echo 'Delete and recreate todoapp db?'
\prompt 'Return for yes or control-C to cancel > ' foo

-- Drop and recreate the database
DROP DATABASE IF EXISTS dietapp;
CREATE DATABASE dietapp;
\connect dietapp;

CREATE TABLE IF NOT EXISTS recipes (
    recipe_id VARCHAR(300) PRIMARY KEY,
    title VARCHAR(50),
    note VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(50),
    recipe_id VARCHAR(300),
    date VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS users (
    user_email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);
