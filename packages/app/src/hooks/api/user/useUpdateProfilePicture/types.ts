import { IUpdateProfilePictureEndpoint } from '@/api/user/types'

export namespace IUseUpdateProfilePicture {
  export type Body = IUpdateProfilePictureEndpoint.Body

  export type Output = {
    isUpdating: boolean
    update: (input: Body) => Promise<IUpdateProfilePictureEndpoint.Response>
  }
}
