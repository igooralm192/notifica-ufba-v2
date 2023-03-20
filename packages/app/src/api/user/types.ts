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

export namespace IResetPasswordEndpoint {
  export interface Request {
    newPassword: string
    token: string
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

export namespace IUpdateProfilePictureEndpoint {
  export interface Body {
    pictureUri: string
  }

  export interface Response {
    url: string
  }
}

export namespace IGetUserProfilePictureEndpoint {
  export interface Params {
    userId: string
  }

  export interface Response {
    url?: string
  }
}

export namespace ISendFeedbackEndpoint {
  export interface Request {
    feedback: string
  }
}

