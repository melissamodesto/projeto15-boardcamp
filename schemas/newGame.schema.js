import Joi from 'joi';

export const newGameSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required().uri(),
    stockTotal: Joi.number().required().min(1),
    categoryId: Joi.number().required(),
    pricePerDay: Joi.number().required().min(0.01),
});