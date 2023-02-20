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
  return (
    <Picture {...pictureProps} loading={isLoading} pictureUrl={url || null} />
  )
}

export default memo(UserProfilePicture)
