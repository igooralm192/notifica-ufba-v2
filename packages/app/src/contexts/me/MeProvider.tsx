import { IUser } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useGetMyUser } from '@/hooks/api'
import { AuthState } from '@/store/auth/types'

import React, { useContext, useEffect } from 'react'
import { useAuth } from '@/contexts/auth'

export interface MeContextData {
  user: IUser
}

const MeContext = React.createContext({} as MeContextData)

const MeProviderBase: React.FC = ({ children }) => {
  const auth = useAuth()

  const { isLoading, user } = useGetMyUser({
    isAuthenticated: auth.state === AuthState.AUTHENTICATED,
  })

  useEffect(() => {
    if (auth.state === AuthState.AUTHENTICATED && !isLoading && !user) {
      auth.signOut()
    }
  }, [isLoading, user])

  if (isLoading) return <FullLoading />
  if (!user) return null

  return <MeContext.Provider value={{ user }}>{children}</MeContext.Provider>
}

export const MeProvider = MeProviderBase

export const useMe = () => useContext(MeContext)
