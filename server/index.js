const pg = require('pg');
const client = new pg.Client('postgres://localhost/joe_vacations_db');
const express = require('express');
const app = express();
app.use(express.json());

const init = async() => {
    await client.connect();
    console.log('connected to database');
    const SQL = `
        DROP TABLE IF EXISTS vacations;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS places;
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50)
        );
        CREATE TABLE places(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50)
        );
        CREATE TABLE vacations(
            id SERIAL PRIMARY KEY,
            place_id INTEGER REFERENCES places(id) NOT NULL,
            user_id INTEGER REFERENCES users(id) NOT NULL,
            created_at TIMESTAMP DEFAULT now(),
            note VARCHAR(100) NOT NULL
        );
        INSERT INTO users(name) VALUES ('joe');
        INSERT INTO users(name) VALUES ('shelly');
        INSERT INTO users(name) VALUES ('rigby');
        INSERT INTO places(name) VALUES ('ecuador');
        INSERT INTO places(name) VALUES ('france');
        INSERT INTO places(name) VALUES ('uk');
        INSERT INTO places(name) VALUES ('new zealand');
        INSERT INTO places(name) VALUES ('chile');
        INSERT INTO vacations(user_id, place_id, note) VALUES (
            (SELECT id FROM users WHERE name='joe'),
            (SELECT id FROM places WHERE name='france'),
            'fun fun fun'
        );
    `;
    await client.query(SQL);
    console.log('create your tables and seed your data');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
};
init();