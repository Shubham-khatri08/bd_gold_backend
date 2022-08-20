const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().custom(password),
    firstname: Joi.string().required(),
    lastname: Joi.string(),
    mobile: Joi.number().min(1000000000).max(9999999999).required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const sendOtp = {
  body: Joi.object().keys({
    mobile: Joi.number().min(1000000000).max(9999999999).required(),
  }),
};

const verifyOtp = {
  body: Joi.object().keys({
    mobile: Joi.number().min(1000000000).max(9999999999).required(),
    otp: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  sendOtp,
  verifyOtp,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
