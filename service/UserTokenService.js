const express = require('express');
const UserToken = require('../model/UserToken');
const Jwt = require('../utils/Jwt');

const get_token_by_user_id = async (user_id, token) => {
    user_token = await UserToken.findOne({ where: { user_id, token } });
    
    return user_token;
}

const insert_token_by_user_id = async (user_id, token) => {
    await UserToken.create({
        user_id,
        token
    })
}

const delete_expired_tokens = async (user_id) => {
    var tokens = await UserToken.findAll({ where: { user_id } });
    // console.log(tokens.length);
    if(tokens.length) {
        tokens.forEach( async (token) => {
            if(!Jwt.decode(token)) {
                await token.destroy();
            }
        });
    }
}

const delete_token_by_user_id = async (user_id, token) => {
    const user_token = await UserToken.findOne({ where: { user_id, token } });
    await user_token.destroy();
}

module.exports = {
    delete_expired_tokens,
    insert_token_by_user_id,
    delete_token_by_user_id,
    get_token_by_user_id
};