import Joi from 'joi'

export const createPostSchema = Joi.object({
  disciplineGroup: Joi.object({
    id: Joi.string(),
    disciplineId: Joi.string(),
  })
    .required()
    .messages({
      'any.required': `Selecione uma turma.`,
      'string.empty': 'Selecione uma turma.',
    }),
  content: Joi.string().trim().required().messages({
    'any.required': `Digite o conteúdo da sua postagem.`,
    'string.empty': 'Digite o conteúdo da sua postagem.',
  }),
})
