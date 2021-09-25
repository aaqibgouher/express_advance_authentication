const express = require('express');
const moment = require('moment');

const generate_otp = async () => {
    return Math.random().toString(36).substr(2, 6);
}

const get_current_datetime = async () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {
    generate_otp,
    get_current_datetime
};