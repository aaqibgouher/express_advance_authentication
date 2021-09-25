const express = require('express');
const Jwt = require('../utils/Jwt');
const Output = require('../utils/Output');
const UserTokenService = require('../service/UserTokenService');

const checkToken = async (req, res, next) => {
    try {
        const token = req.query.token;
        
        const decoded = await Jwt.decode(token);
        
        if (!decoded) throw "invalid token ..";
        
        const user_token = await UserTokenService.get_token_by_user_id(decoded.data, token);
        
        if (!user_token) throw "invalid token, please enter a valid token ..";
        
        req.session.data = { user_id: decoded.data, token };
        
        await next();
    } catch (err) {
        return await Output.error(res, err);
    }
}

module.exports = {
    checkToken
};