import { IUser } from '@shared/entities'
import { useMe } from '@/contexts/me'

import React, { useContext } from 'react'
import { useAuth } from '@/contexts/auth'

export interface ProfilePresenterContextData {
  user: IUser
  logout: () => void
}

const ProfilePresenterContext = React.createContext(
  {} as ProfilePresenterContextData,
)

export const ProfilePresenter: React.FC<React.PropsWithChildren> = ({ children }) => {
  const auth = useAuth()
  const { user } = useMe()

  const handleLogout = () => {
    auth.onTokenChange(null)
  }

  if (!user) return null

  return (
    <ProfilePresenterContext.Provider value={{ user, logout: handleLogout }}>
      {children}
    </ProfilePresenterContext.Provider>
  )
}

export const withProfilePresenter = (Component: React.FC) => {
  return (props: any) => (
    <ProfilePresenter>
      <Component {...props} />
    </ProfilePresenter>
  )
}

export const useProfilePresenter = () => useContext(ProfilePresenterContext)
