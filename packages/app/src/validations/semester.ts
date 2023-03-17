import Joi, { CustomHelpers } from 'joi'

export const semesterSchema = Joi.string()
  .trim()
  .pattern(/^[0-9][0-9][0-9][0-9].[1-2]$/)
  // .custom((a: string, b: CustomHelpers) => {
  //   if (a.length < 6) return true

  //   const [year, sem] = a.split('.')

  //   const inputYear = Number(year)
  //   const inputSem = Number(sem)

  //   const currentYear = new Date().getFullYear()
  //   const currentSem = Math.floor(new Date().getMonth() / 6) + 1
    
  //   // if (inputYear < currentYear || inputSem )

  // })
  .messages({
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
    'string.trim': 'Não pode haver espaços no início e no fim.',
    'string.pattern.base':
      "Semestre precisa estar no formato: '#####.#' (# -> dígito)",
  })
