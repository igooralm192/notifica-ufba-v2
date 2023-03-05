import { ErrorCode } from '@/errors/codes'

export const errorMessages = {
  [ErrorCode.InternalServerError]: 'Ocorreu um erro interno no servidor.',
  [ErrorCode.NetworkError]:
    'Não conseguimos conectar com o nosso servidor, parece ser um problema de conexão. Tente novamente mais tarde.',
}
