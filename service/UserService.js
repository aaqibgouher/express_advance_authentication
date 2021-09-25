const express = require('express');
const validator = require('validator');
const User = require('../model/User');
const Op = require('sequelize').Op;
const Jwt = require('../utils/Jwt');
const UserTokenService = require('../service/UserTokenService');
const Common = require('../utils/Common');

const register = async (first_name, last_name, email, password, phone, params = []) => {

    // validation
    if(validator.isEmpty(first_name)) throw "first name is required ..";
    if(validator.isEmpty(last_name)) throw "last name is required ..";
    if(validator.isEmpty(email)) throw "email is required ..";
    if(!validator.isEmail(email)) throw "correct email is required ..";
    if(validator.isEmpty(password)) throw "correct password is required ..";
    if(validator.isEmpty(phone)) throw "phone is required ..";
    if(!validator.isLength(phone, 10, 10)) throw "phone number should be 10 digit ..";

    // check user exists or not
    var user = await User.findOne({ raw:true, where: {
        [Op.or]: [
            {
                email: { [Op.eq]: email }
            },
            {
                phone: { [Op.eq]: phone }
            }
        ]
    }});
    
    // if user exists. throwing error
    if(user) throw "user alresdy exists ..";

    // checking optional keys that exists or not
    address = params.hasOwnProperty('address') ? params.address : null;
    
    // inserting in users table
    user = await User.create({
        first_name,
        last_name,
        email,
        password,
        phone,
        address
    });

    return user;
}

const login = async (email, password) => {

    // validation
    if(validator.isEmpty(email)) throw "email is required ..";
    if(validator.isEmpty(password)) throw "correct password is required ..";

    // check user exists or not
    var user = await get_by_email(email);
    
    if(!user) throw "invalid email ..";
    if(user.password != password) throw "invalid email and password";
    // if(!user.is_verified) throw "user is not verified ..";

    const user_id = user.id;
    
    // generating jwt tokens
    const token = await Jwt.generate_jwt(user_id);
    
    // deleting expired tokens
    await UserTokenService.delete_expired_tokens(user_id); 
    
    // insert token by user_id
    await UserTokenService.insert_token_by_user_id(user_id, token);
    
    // editing last_login_at time in users table
    await edit_user_by_id(user_id, { last_login_at: await Common.get_current_datetime() });
    
    var data = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        token,
        last_login_at: user.last_login_at
    };

    return data;

}

const send_otp = async (user_id) => {
    
    var user = await get_by_id(user_id);
    
    var otp = user.otp;
    
    otp = otp ? otp : await Common.generate_otp();
    
    await edit_user_by_id(user_id, { otp });
}

const get_by_id = async (user_id) => {
    return await User.findOne({ raw:true, where: { id: user_id } });
}

const get_by_email = async (email) => {
    return await User.findOne({ raw:true, where: { email } });
}

const edit_user_by_id = async (user_id, params = []) => {
    
    var user = await get_by_id(user_id);
    
    if(!user) throw `user does not exist with id ${user_id}`;
    
    if(params.hasOwnProperty('otp')) {
        const otp = params.otp;
        user.otp = otp;
    }
    
    if(params.hasOwnProperty('last_login_at')) {
        const last_login_at = params.last_login_at;
        user.last_login_at = last_login_at;
    }
    
    await User.update(params, { where: { id: user_id } });
}

module.exports = {          
    register,
    login,
    send_otp,
    get_by_id,
    edit_user_by_id
};