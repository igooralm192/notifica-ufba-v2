import { IGetUserProfilePictureEndpoint } from "@/api/user/types"

export namespace IUseGetUserProfilePictureUrl {
  export type Params = IGetUserProfilePictureEndpoint.Params

  export type Output = {
    isLoading: boolean
    url?: string
  }
}
