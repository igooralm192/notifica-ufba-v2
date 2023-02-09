import { UserMapper } from '@/mappers'
import { api } from '@/services/api'

import {
  IGetMyUserEndpoint,
  ILoginEndpoint,
  IPatchMyUserEndpoint,
  IForgotPasswordEndpoint,
  IResetPasswordEndpoint,
  IUpdateProfilePictureEndpoint,
} from './types'

export const login = async ({
  email,
  password,
}: ILoginEndpoint.Request): Promise<ILoginEndpoint.Response> => {
  const response = await api.post('/auth/user', { email, password })

  const { token } = response.data

  return { token }
}

export const forgotPassword = async ({
  email,
}: IForgotPasswordEndpoint.Request): Promise<void> => {
  await api.post('/auth/user/forgot', { email })
}

export const resetPassword = async ({
  newPassword,
  token,
}: IResetPasswordEndpoint.Request): Promise<void> => {
  await api.post('/auth/user/reset', { newPassword, token })
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

export const updateProfilePicture = async ({
  pictureUri,
}: IUpdateProfilePictureEndpoint.Body): Promise<IUpdateProfilePictureEndpoint.Response> => {
  const responseBlob = await fetch(pictureUri)
  const blobFile = await responseBlob.blob()

  const data = new FormData()

  data.append('picture', {
    // @ts-ignore
    uri: pictureUri,
    type: blobFile.type,
    name: `profile-picture.${blobFile.type.split('/')[1]}`,
  })

  const response = await api.put('/users/me/profile-picture', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return { url: response.data.url }
}
 