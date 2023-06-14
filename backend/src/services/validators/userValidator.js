const Joi = require("joi");

const userValidator = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";

  return Joi.object({
    login: Joi.string().min(1).max(50).presence(presence),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/)
      .presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

module.exports = userValidator;
