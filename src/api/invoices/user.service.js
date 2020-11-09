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
    console.log('Greška u validaciji.');
    return { error };
  }
  return { value };
};

//  VALIDACIJA ZABORAVLJENE LOZINKE
exports.validateForgotSchema = (body) => {
  console.log(body);
console.log('Prosao validateForgotSchema');

  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  
  const { error, value } = schema.validate({
    email: body.email
  });

  if (error && error.details) {
    console.log('Greška u validaciji forgot password.');
    return { error };
  }
  return { value };
};


// ovisno o nacinu na koji se logiramo definiramo usera
exports.getUser = (user)=> {
  const rsp = {};
  if (user.local.email) {
    rsp.name = user.local.name;
    rsp.email = user.local.email;
  }
  if (user.google.email) {
    rsp.name = user.google.displayName;
    rsp.email = user.google.email;
  }
  if (user.github.email) {
    rsp.name = user.github.displayName;
    rsp.email = user.github.email;
  }
  // if (user.twitter.email) {
  //   rsp.name = user.twitter.displayName;
  //   rsp.email = user.twitter.email;
  // }
  console.log(rsp);
  
  return rsp;
};
