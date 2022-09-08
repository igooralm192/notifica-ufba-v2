import { IStudent } from './Student'
import { ITeacher } from './Teacher'

export type IUserType = 'STUDENT' | 'TEACHER'

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  type: IUserType
  pushToken?: string

  teacher?: ITeacher
  student?: IStudent

  createdAt: Date
  updatedAt: Date
}
