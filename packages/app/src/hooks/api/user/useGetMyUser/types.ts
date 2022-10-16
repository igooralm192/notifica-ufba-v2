import { IUser } from "@shared/entities"

export namespace IUseGetMyUser {
  export type Params = {
    isAuthenticated?: boolean
  }

  export type Output = {
    isLoading: boolean
    user: IUser | null
  }
}
