const pg = require('pg');
const client = new pg.Client('postgres://localhost/joe_vacations_db');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/users', async(req, res, next) => {
    try {
        const SQL = `
            SELECT *
            FROM users
        `;
        const response = await client.query(SQL);
        res.send(response.rows)
    } catch (error) {
      next(error)  
    }
});

app.get('/api/places', async(req, res, next) => {
    try {
        const SQL = `
            SELECT *
            FROM places
        `;
        const response = await client.query(SQL);
        res.send(response.rows)
    } catch (error) {
      next(error)  
    }
});

app.get('/api/vacations', async(req, res, next) => {
    try {
        const SQL = `
            SELECT *
            FROM vacations
        `;
        const response = await client.query(SQL);
        res.send(response.rows)
    } catch (error) {
      next(error)  
    }
});

app.post('/api/vacations', async(req, res, next) => {
    console.log(req)
    try {
        const SQL = `
            INSERT INTO vacations(user_id, place_id, note) VALUES($1, $2, $3) RETURNING *
        `;
        const response = await client.query(SQL, [req.body.user_id, req.body.place_id, req.body.note]);
        res.send(response.rows[0]);
    } catch (error) {
      next(error);  
    }
});

app.post('/api/users', async(req,res,next) => {
    try {
        const SQL = `
            INSERT INTO users(name) VALUES ($1) RETURNING *
        `;
        const response = await client.query(SQL, [req.body.name]);
        res.send(response.rows[0]);
    } catch (error) {
      next(error);  
    }
});

app.delete('/api/vacations/:id', async(req, res, next) => {
    try {
        const SQL = `
            DELETE FROM vacations WHERE id=$1
        `;
        await client.query(SQL, [req.params.id]);
        res.sendStatus(204);
    } catch (error) {
      next(error);  
    }
});

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