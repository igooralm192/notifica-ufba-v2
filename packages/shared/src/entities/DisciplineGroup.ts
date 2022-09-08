import { IStudent } from './Student'
import { IDiscipline } from './Discipline'
import { ITeacher } from './Teacher'

export interface IDisciplineGroup {
  id: string
  code: string
  semester: string
  description: string
  place: string
  menuUrl: string
  classTime: Date

  teacherId?: string
  disciplineId?: string
  studentIds?: string[]

  teacher?: ITeacher
  discipline?: IDiscipline
  students?: IStudent[]

  createdAt: Date
  updatedAt: Date
}
