const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/database');

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    otp: {
        type: DataTypes.STRING(6),
        allowNull: true,
    },
    is_verified: {
        type: DataTypes.ENUM('0', '1'),
        allowNull: '0',
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
    },
    last_login_at: {
        type: 'DATETIME',
        allowNull: true,
    }
})

module.exports = User;