import { IUser } from '@shared/entities'

import api from '@/api'
import { FullLoading } from '@/components/FullLoading'
import { useAuthStateSelector } from '@/state/zustand/auth'
import { AuthState } from '@/store/auth/types'

import React, { useContext } from 'react'
import { useQuery } from 'react-query'

export interface MeContextData {
  user: IUser | null
}

const MeContext = React.createContext({} as MeContextData)

const MeProviderBase: React.FC = ({ children }) => {
  const authState = useAuthStateSelector()

  const { isLoading, data } = useQuery(
    ['currentUser'],
    () => {
      return api.user.getMyUser()
    },
    {
      enabled: authState === AuthState.AUTHENTICATED,
    },
  )

  if (isLoading) return <FullLoading />
  if (!data) return null

  return (
    <MeContext.Provider value={{ user: data.user }}>
      {children}
    </MeContext.Provider>
  )
}

export const MeProvider = MeProviderBase

export const useMe = () => useContext(MeContext)
