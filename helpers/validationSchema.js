const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).max(60).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).max(60).required(),
});

const createBookSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  author: Joi.string().min(3).max(100).required(),
  summary: Joi.string().min(3).max(2000).required(),
});

const updateBookSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  author: Joi.string().min(3).max(100),
  summary: Joi.string().min(3).max(2000),
}).or("title", "author", "summary");

module.exports = {
  registerSchema,
  loginSchema,
  createBookSchema,
  updateBookSchema,
};
