import { UserMapper } from '@/mappers'
import { api } from '@/services/api'

import Constants, { ExecutionEnvironment } from 'expo-constants'
import mime from 'mime'

import {
  IGetMyUserEndpoint,
  ILoginEndpoint,
  IPatchMyUserEndpoint,
  IForgotPasswordEndpoint,
  IResetPasswordEndpoint,
  IUpdateProfilePictureEndpoint,
  IGetUserProfilePictureEndpoint,
  ISendFeedbackEndpoint,
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
  const isExpoGo =
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient
  
  await api.post('/auth/user/forgot', { email }, { params: { expo: isExpoGo } })
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
  const pictureType = mime.getType(pictureUri)
  const pictureExt = mime.getExtension(pictureType!)

  const data = new FormData()

  data.append('picture', {
    // @ts-ignore
    uri: pictureUri,
    type: pictureType!,
    name: `profile-picture.${pictureExt}`,
  })

  const response = await api.put('/users/me/profile-picture', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })

  return { url: response.data.url }
}

export const getUserProfilePictureUrl = async ({
  userId,
}: IGetUserProfilePictureEndpoint.Params): Promise<IGetUserProfilePictureEndpoint.Response> => {
  const response = await api.get(`/users/${userId}/profile-picture`)

  return {
    url: response.data.url
      ? `${response.data.url}?${new Date().valueOf()}`
      : undefined,
  }
}

export const sendFeedback = async ({
  feedback
}: ISendFeedbackEndpoint.Request): Promise<void> => {
  console.log('OXI', feedback)
  await api.post('/users/send-feedback', { feedback })
}
