const Joi = require('joi');

exports.validateSchema = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate({
    email: body.email,
    password: body.password,
  });

  if (error && error.details) {
    return { error };
  }
  return { value };
};
