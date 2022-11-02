import { celebrate, Joi } from 'celebrate';

export const validateBoard = celebrate({
  query: Joi.object().keys({
    board: Joi.string().length(9)
  }),
});
