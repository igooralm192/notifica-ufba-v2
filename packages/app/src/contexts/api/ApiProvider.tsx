import api from '@/api'
import { FullLoading } from '@/components/FullLoading'
import { BaseError } from '@/helpers'
import { apiState } from '@/state/api'
import { authStateQuery, tokenState } from '@/state/auth'
import { loaderState } from '@/state/loader'
import { AxiosError } from 'axios'

import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import {
  useRecoilCallback,
  useRecoilSnapshot,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

export interface ApiContextData {}

const ApiContext = React.createContext({} as ApiContextData)

const ApiProviderBase: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false)

  const getToken = useRecoilCallback(
    ({ snapshot }) =>
      () =>
        snapshot.getPromise(tokenState),
    [],
  )

  useEffect(() => {
    console.log('API INTERCEPTOR')
    setReady(true)

    const interceptorId = api.instance.interceptors.request.use(
      async config => {
        const token = await getToken()
        console.log('API INTERCEPTOR REQUEST', token)

        if (config.headers)
          config.headers.Authorization = token ? 'Bearer ' + token : ''

        return config
      },
    )

    return () => api.instance.interceptors.request.eject(interceptorId)
  }, [])

  useEffect(() => {
    const interceptorId = api.instance.interceptors.response.use(
      response => {
        console.log('API INTERCEPTOR RESPONSE')

        return response
      },
      (err: AxiosError) => {
        console.log('API INTERCEPTOR RESPONSE ERROR')
        // TODO: Handle network error
        if (!err?.response?.data?.code || !err?.response?.data?.message) {
          return Promise.reject(
            new BaseError(
              'INTERNAL_SERVER_ERROR',
              'Internal server error',
              undefined,
              err.stack,
            ),
          )
        }

        const error = new BaseError(
          err?.response?.data?.code,
          err?.response?.data?.message,
          undefined,
          err?.stack,
        )

        return Promise.reject(error)
      },
    )

    return () => api.instance.interceptors.response.eject(interceptorId)
  }, [])

  if (!ready) return <FullLoading />

  return <ApiContext.Provider value={{}}>{children}</ApiContext.Provider>
}

export const ApiProvider = ApiProviderBase

export const useApi = () => useContext(ApiContext)
