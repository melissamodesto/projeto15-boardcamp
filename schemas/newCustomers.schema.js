import Joi from "joi";

export const newCustomersSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .required()
    .pattern(/^[0-9]{10,11}$/),
  cpf: Joi.string()
    .required()
    .pattern(/^[0-9]{11}$/),
  birthday: Joi.date().required(),
});
