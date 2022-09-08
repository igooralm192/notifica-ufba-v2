import { IUser } from './User'

export interface ITeacher {
  id: string

  userId: string
  user?: IUser

  createdAt: Date
  updatedAt: Date
}
