CREATE DATABASE todolist;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY, --SERIAL :  pseudo-type to define auto-increment columns in tables.
    description varchar(255)
);

