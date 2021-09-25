const express = require('express');
const UserService = require('../service/UserService');
const Output = require('../utils/Output');
const Common = require('../utils/Common');
const Auth = require('../utils/Auth');
const Jwt = require('../utils/Jwt');
const UserTokenService = require('../service/UserTokenService');
const session = require('express-session');

const dashboard = async (req, res) => {
    try{    
        
        var data = [];
        console.log(6);
        var id = await Auth.id(req);
        var token = await Auth.token(req);
        var user = await Auth.user(req);
        data = {
            id,
            token,
            user
        }
        return await Output.success(res, "welcome in dashboard", data);
    }catch(err) {
        console.log(err);
        return await Output.error(res, err);
    }
}

const register = async (req, res) => {
    try{

        const { first_name, last_name, email, password, phone, address } = req.query;
        var params = [], data = [];

        if(address) params['address'] = address;
        
        data = await UserService.register(first_name, last_name, email, password, phone, params);
        
        // generate otp
        await UserService.send_otp(data.id);
        
        // login
        data = await UserService.login(email, password);                                 
        
        return await Output.success(res, "successfully registered ..", data);

    }catch(err){
        return await Output.error(res, err);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.query;
        var data = [];
        
        data = await UserService.login(email, password);
        
        return await Output.success(res, "successfully login ..", data);
    } catch(err) {
        return await Output.error(res, err);
    }
}

const logout = async (req, res) => {
    try {
        token = req.query.token;

        const decoded = await Jwt.decode(token);

        // deleting token from the user_token table 
        await UserTokenService.delete_token_by_user_id(decoded.data, token);

        return await Output.success(res, "successfully logout ..", []);

    }catch(err) {
        return await Output.error(res, err);
    }
}

module.exports = {
    dashboard,
    register,
    login,
    logout
}