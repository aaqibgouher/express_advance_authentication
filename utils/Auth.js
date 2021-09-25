const express = require('express');
const session = require('express-session');
const UserService = require('../service/UserService');

const id = async (req) => {
    return await req.session.data.user_id;
}

const token = async (req) => {
    return await req.session.data.token;
}

const user = async (req) => {
    var user_id = await id(req);
    return await UserService.get_by_id(user_id);
}

module.exports = {
    id,
    token,
    user
};