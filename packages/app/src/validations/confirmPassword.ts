import Joi from 'joi'

export const confirmPasswordSchema = Joi.any()
  .equal(Joi.ref('password'))
  .messages({
    'any.only': 'As senhas não conferem.',
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
  })
