const express = require('express');

const success = async (res, message = "", data = []) => {
    return await output(res, 200, message, data);
}

const error = async (res, message = "") => {
    return await output(res, 400, message);
}

const output = async (res, status = 200, message = "", data = []) => {
    return res.status(status).json({ status, message, data });
}

module.exports = {
    success,
    output,
    error
}
