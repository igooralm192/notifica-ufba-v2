import { IUser } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { currentUserState } from '@/state/user'

import React, { useContext } from 'react'
import { useRecoilValueLoadable } from 'recoil'

export interface MeContextData {
  user: IUser | null
}

const MeContext = React.createContext({} as MeContextData)

const MeProviderBase: React.FC = ({ children }) => {
  const userLoadable = useRecoilValueLoadable(currentUserState)

  if (userLoadable.state === 'loading') return <FullLoading />

  return (
    <MeContext.Provider value={{ user: userLoadable.getValue() }}>
      {children}
    </MeContext.Provider>
  )
}

export const MeProvider = MeProviderBase

export const useMe = () => useContext(MeContext)
