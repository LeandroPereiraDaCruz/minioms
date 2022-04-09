import { celebrate, Joi, Segments } from 'celebrate';

const createCustomerValidator = () => {
    return celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi
                .string()
                .trim()
                .min(2)
                .max(100)
                .required(),
            document: Joi.object().keys({
                cpf: Joi
                    .string()
                    .length(11)
                    .regex(/^\d+$/),
                cnpj: Joi
                    .string()
                    .length(14)
                    .regex(/^\d+$/)
            }).required().xor("cpf", "cnpj"),
            contact: Joi.object().keys({
                email: Joi
                    .string()
                    .email()
                    .max(100)
                    .required(),
                phone: Joi
                    .string()
                    .trim()
                    .max(15)
            }).required()
        })
    });
};

const getCustomersAllValidator = () => {
    return celebrate({
        [Segments.QUERY]: Joi.object().keys({
            offset: Joi.string(),
            limit: Joi.string(),
        }),
    });
};

const getCustomerByIdValidator = () => {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().guid().required(),
      }),
    });
  };

export {
    createCustomerValidator, getCustomersAllValidator, getCustomerByIdValidator
};
