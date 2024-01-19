const pg = require('pg');
const client = new pg.Client('postgres://localhost/joe_vacations_db');
const express = require('express');
const app = express();
app.use(express.json());

const init = async() => {
    await client.connect();
    console.log('connected to database');
    const SQL = `
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS places;
        DROP TABLE IF EXISTS vacations;
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50)
        );
        CREATE TABLE places(
            id SERIAL PRIMARY KEY,
            place VARCHAR(50)
        );
        CREATE TABLE vacations(
            id SERIAL PRIMARY KEY,
            place_id INTEGER REFERENCES places(id) NOT NULL,
            user_id INTEGER REFERENCES users(id) NOT NULL,
            created_at TIMESTAMP DEFAULT now(),
            note VARCHAR(100) NOT NULL
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