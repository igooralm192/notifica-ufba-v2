import { IUser } from '@shared/entities'

export namespace ILoginEndpoint {
  export interface Request {
    email: string
    password: string
  }

  export interface Response {
    token: string
  }
}

export namespace IForgotPasswordEndpoint {
  export interface Request {
    email: string
  }

  export interface Response {}
}

export namespace IPatchMyUserEndpoint {
  export interface Request {
    pushToken?: string
  }

  export interface Response {
    user: IUser
  }
}

export namespace IGetMyUserEndpoint {
  export interface Response {
    user: IUser
  }
}
