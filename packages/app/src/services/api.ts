import { BaseError } from '@/helpers'
import axios, { AxiosError } from 'axios'

import env from '@/config/env'

export const api = axios.create({
  baseURL: env.API_URL ?? 'http://10.0.2.2:3333/api',
  timeout: 6000,
})

// api.interceptors.request.use(async config => {
//   const token = await AsyncStorage.getItem('TOKEN')
//   console.log('INTERCEPTOR TOKEN', token)

//   if (config.headers)
//     config.headers.Authorization = token ? 'Bearer ' + token : ''

//   return config
// })

// api.interceptors.response.use(
//   response => response,
//   (err: AxiosError) => {
//     // TODO: Handle network error
//     if (!err?.response?.data?.code || !err?.response?.data?.message) {
//       return Promise.reject(
//         new BaseError(
//           'INTERNAL_SERVER_ERROR',
//           'Internal server error',
//           undefined,
//           err.stack,
//         ),
//       )
//     }

//     const error = new BaseError(
//       err?.response?.data?.code,
//       err?.response?.data?.message,
//       undefined,
//       err?.stack,
//     )

//     return Promise.reject(error)
//   },
// )
