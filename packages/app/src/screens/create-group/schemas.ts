import * as Validations from '@/validations'
import Joi from 'joi'

export const createGroupSchema = Joi.object({
  disciplineId: Joi.string().required().messages({
    'any.required': `Selecione uma disciplina para a turma.`,
    'string.empty': 'Selecione uma disciplina para a turma.',
  }),
  code: Validations.groupCode.required(),
  menuUrl: Validations.menuUrl.required(),
  place: Joi.string().required().messages({
    'any.required': `Selecione um local para a turma.`,
    'string.empty': 'Selecione um local para a turma.',
  }),
  description: Joi.string().trim().required().messages({
    'any.required': `Adicione uma descrição para a turma.`,
    'string.empty': 'Adicione uma descrição para a turma.',
  }),
})
