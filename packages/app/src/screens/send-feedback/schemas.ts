import Joi from 'joi'

export const sendFeedbackSchema = Joi.object({
  feedback: Joi.string().trim().required().messages({
    'any.required': `Digite o conteúdo do seu feedback.`,
    'string.empty': 'Digite o conteúdo do seu feedback.',
  }),
})
