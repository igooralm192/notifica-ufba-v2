import { UserMapper } from '@/mappers'
import { api } from '@/services/api'

import {
  IGetMyUserEndpoint,
  ILoginEndpoint,
  IPatchMyUserEndpoint,
} from './types'

export const login = async ({
  email,
  password,
}: ILoginEndpoint.Request): Promise<ILoginEndpoint.Response> => {
  const response = await api.post('/auth/user', { email, password })

  const { token } = response.data

  return { token }
}

export const patchMyUser = async ({
  pushToken,
}: IPatchMyUserEndpoint.Request): Promise<IPatchMyUserEndpoint.Response> => {
  const response = await api.patch('/users/me', { pushToken })

  return { user: UserMapper.toEntity(response.data.user) }
}

export const getMyUser = async (): Promise<IGetMyUserEndpoint.Response> => {
  const response = await api.get('/users/me')

  return { user: UserMapper.toEntity(response.data.user) }
}
