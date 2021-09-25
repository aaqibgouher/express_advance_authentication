const express = require('express');
const Jwt = require('jsonwebtoken');

const generate_jwt = async (user_id) => {
    return Jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user_id
        }, "09f26e402586e2faa8da4c98a35f1b20d6b033c60...")
}

const decode = async (token) => {
    return await Jwt.decode(token);
}
module.exports = {
    generate_jwt,
    decode
};