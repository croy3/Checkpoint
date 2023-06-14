const Joi = require("joi");

const projectValidator = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";

  return Joi.object({
    name: Joi.string().min(1).max(50).presence(presence),
    description: Joi.string().min(1).max(65535).presence(presence),
    image_address: Joi.string().min(1).max(255).presence(presence),
    creation_date: Joi.string()
      .regex(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/)
      .presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

module.exports = projectValidator;
