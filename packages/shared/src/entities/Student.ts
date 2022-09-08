import { IDisciplineGroup } from './DisciplineGroup'
import { IUser } from './User'

export interface IStudent {
  id: string
  matriculation: string
  course: string

  userId: string
  user?: IUser

  groups?: IDisciplineGroup[]

  createdAt: Date
  updatedAt: Date
}
