const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/database');

const UserToken = db.define('user_tokens', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: 'DATETIME',
        allowNull: true,
        field: 'created_at', 
    },
    updatedAt: {
        type: 'DATETIME',
        allowNull: true,
        field: 'updated_at', 
    }
})

module.exports = UserToken;