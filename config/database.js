const express = require('express');
const Sequelize = require('sequelize');

// connecting with the db
const db = new Sequelize('express_advance_auth', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

// checking the connection
const check_connection = async () => {
    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

module.exports = {
    db,
    check_connection
}