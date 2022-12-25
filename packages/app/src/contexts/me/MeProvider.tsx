import { IUser } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useGetMyUser } from '@/hooks/api'
import { useAuthStateSelector } from '@/state/zustand/auth'
import { AuthState } from '@/store/auth/types'

import React, { useContext } from 'react'
export interface MeContextData {
  user: IUser | null
}

const MeContext = React.createContext({} as MeContextData)

const MeProviderBase: React.FC = ({ children }) => {
  const authState = useAuthStateSelector()

  const { isLoading, user } = useGetMyUser({
    isAuthenticated: authState === AuthState.AUTHENTICATED,
  })

  if (isLoading) return <FullLoading />
  if (!user) return null

  return <MeContext.Provider value={{ user }}>{children}</MeContext.Provider>
}

export const MeProvider = MeProviderBase

export const useMe = () => useContext(MeContext)
