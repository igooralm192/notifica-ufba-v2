import { IUserType, IUser } from '@shared/entities'

export namespace IUserRepository {
  export namespace Create {
    export type Input = {
      name: string
      email: string
      password: string
      type: IUserType
    }
    export type Output = IUser
  }

  export interface Create {
    create(input: Create.Input): Promise<Create.Output>
  }

  export namespace Update {
    export type Input = {
      where: { id?: string }
      data: {
        pushToken?: string
      }
    }
    export type Output = IUser
  }

  export interface Update {
    update(input: Update.Input): Promise<Update.Output>
  }

  export namespace FindOne {
    export type Input = {
      id?: string
      email?: string
    }
    export type Output = IUser | null
  }

  export interface FindOne {
    findOne(input: FindOne.Input): Promise<FindOne.Output>
  }
}
