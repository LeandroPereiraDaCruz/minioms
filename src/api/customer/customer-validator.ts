import { celebrate, Joi, Segments } from "celebrate";

const createCustomerValidator = () => {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().trim().min(2).max(100).required(),
      document: Joi.object()
        .keys({
          cpf: Joi.string().length(11).regex(/^\d+$/),
          cnpj: Joi.string().length(14).regex(/^\d+$/),
        })
        .required()
        .xor("cpf", "cnpj"),
      contact: Joi.object()
        .keys({
          email: Joi.string().email().max(100).required(),
          phone: Joi.string().trim().max(15),
        })
        .required(),
    }),
  });
};

const listCustomersValidator = () => {
  return celebrate({
    [Segments.QUERY]: Joi.object().keys({
      offset: Joi.number().optional().min(0),
      limit: Joi.number().optional().min(0),
    }),
  });
};

const findCustomerValidator = () => {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      customerUuid: Joi.string()
        .required()
        .regex(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        ),
    }),
  });
};

export {
  createCustomerValidator,
  listCustomersValidator,
  findCustomerValidator,
};
