import { IUser } from '@shared/entities'

import { useAuth } from '@/contexts/auth'
import { useMe } from '@/contexts/me'
import { useUpdateProfilePicture } from '@/hooks/api'

import React, { useContext } from 'react'

export interface ProfilePresenterContextData {
  user: IUser
  logout: () => void
  updateProfilePicture: {
    loading: boolean
    update: (pictureUri: string) => Promise<void>
  }
}

const ProfilePresenterContext = React.createContext(
  {} as ProfilePresenterContextData,
)

export const ProfilePresenter: React.FC = ({ children }) => {
  const auth = useAuth()
  const { user } = useMe()

  const { isUpdating, update: updateProfilePicture } = useUpdateProfilePicture(
    user?.id,
  )

  const handleLogout = () => {
    auth.signOut()
  }

  const handleUpdateProfilePicture = async (pictureUri: string) => {
    await updateProfilePicture({ pictureUri })
  }

  if (!user) return null

  return (
    <ProfilePresenterContext.Provider
      value={{
        user,
        logout: handleLogout,
        updateProfilePicture: {
          loading: isUpdating,
          update: handleUpdateProfilePicture,
        },
      }}
    >
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
