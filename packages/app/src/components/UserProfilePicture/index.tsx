import { Picture, PictureProps } from '@/components/Picture'
import { useGetUserProfilePictureUrl } from '@/hooks/api'

import React, { memo } from 'react'

export interface UserProfilePictureProps {
  userId: string
  pictureProps?: Partial<PictureProps>
}

const UserProfilePicture: React.FC<UserProfilePictureProps> = ({
  userId,
  pictureProps,
}) => {
  const { isLoading, url } = useGetUserProfilePictureUrl({ userId })

  const pictureUrl = url ? `${url}?${new Date().valueOf()}` : null

  return (
    <Picture {...pictureProps} loading={isLoading} pictureUrl={pictureUrl} />
  )
}

export default memo(UserProfilePicture)
