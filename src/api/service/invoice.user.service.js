const Joi = require('joi');

exports.validateSchema = (body) => {
  console.log('body=',body);
  
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate({
    email: body.email,
    password: body.password,
  });

  if (error && error.details) {
    console.log('Greška u validaciji');
    
    return { error };
  }
  return { value };
};
