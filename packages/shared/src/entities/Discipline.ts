import { ITeacher } from './Teacher'
import { IDisciplineGroup } from './DisciplineGroup'

export interface IDiscipline {
  id: string
  name: string
  code: string
  course: string

  teachers?: ITeacher[]
  groups?: IDisciplineGroup[]

  createdAt: Date
  updatedAt: Date
}
