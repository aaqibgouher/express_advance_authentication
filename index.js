const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const { db, check_connection } = require('./config/database');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const moment = require('moment');
const session = require('express-session');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false, cookie: { maxAge: 1000 * 60 * 60 } }));

// checking db connection
check_connection(); 

app.get('/session', (req, res) => {
    req.session.name = 'aaqib';
    res.send('<h1>session initialised ..</h1>');
})

app.get('/session2', (req, res) => {
    res.send(`${req.session.name}`);
})

app.use('/api/auth', require('./routes/user_api'));

const PORT = 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT} ..`));