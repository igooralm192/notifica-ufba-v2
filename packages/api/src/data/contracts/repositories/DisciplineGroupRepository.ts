import { IDisciplineGroup, IStudent, ITeacher } from '@shared/entities'
import { IQueryFilterDTO } from '@/domain/dtos'
import { ITeacherRepositoryListInput } from '@/data/contracts'

export type IDisciplineGroupRepositoryListInput = {
  where?: IQueryFilterDTO<IDisciplineGroup>
  take?: number
  skip?: number
  select?: {
    [key in keyof IDisciplineGroup]?: boolean
  }
  include?: {
    discipline?: boolean
    teacher?: boolean | ITeacherRepositoryListInput
  }
  orderBy?: {
    discipline?: {
      code?: 'asc' | 'desc'
    }
  }
}

export namespace IFindAllDisciplineGroupRepository {
  export type Input = IDisciplineGroupRepositoryListInput
  export type Output = IDisciplineGroup[]
}

export interface IFindAllDisciplineGroupRepository {
  findAll(
    input: IFindAllDisciplineGroupRepository.Input,
  ): Promise<IFindAllDisciplineGroupRepository.Output>
}

export namespace IFindOneDisciplineGroupRepository {
  export type Input = {
    where: {
      id?: string
      code?: string
    }
    include?: {
      discipline?: boolean
      teacher?: boolean | ITeacherRepositoryListInput
    }
  }
  export type Output = IDisciplineGroup | null
}

export interface IFindOneDisciplineGroupRepository {
  findOne(
    input: IFindOneDisciplineGroupRepository.Input,
  ): Promise<IFindOneDisciplineGroupRepository.Output>
}

export namespace ICountDisciplineGroupRepository {
  export type Input = IDisciplineGroupRepositoryListInput
  export type Output = number
}

export interface ICountDisciplineGroupRepository {
  count(
    input?: ICountDisciplineGroupRepository.Input,
  ): Promise<ICountDisciplineGroupRepository.Output>
}

export namespace IPushStudentDisciplineGroupRepository {
  export type Input = {
    studentId: string
  }
  export type Output = IDisciplineGroup
}

export interface IPushStudentDisciplineGroupRepository {
  pushStudent(
    disciplineGroupId: string,
    input: IPushStudentDisciplineGroupRepository.Input,
  ): Promise<IPushStudentDisciplineGroupRepository.Output>
}

export namespace IRemoveStudentDisciplineGroupRepository {
  export type Input = {
    studentId: string
  }
  export type Output = IDisciplineGroup
}

export interface IRemoveStudentDisciplineGroupRepository {
  removeStudent(
    disciplineGroupId: string,
    input: IRemoveStudentDisciplineGroupRepository.Input,
  ): Promise<IRemoveStudentDisciplineGroupRepository.Output>
}

export namespace ICreateDisciplineGroupRepository {
  export type Params = {
    disciplineId: string
    teacherId: string
  }

  export type Body = {
    code: string
    semester: string
    description: string
    menuUrl: string
    place: string
  }

  export type Output = IDisciplineGroup
}

export interface ICreateDisciplineGroupRepository {
  create(
    params: ICreateDisciplineGroupRepository.Params,
    body: ICreateDisciplineGroupRepository.Body,
  ): Promise<ICreateDisciplineGroupRepository.Output>
}

export namespace IDeleteDisciplineGroupRepository {
  export type Input = {
    where: {
      id?: string
      code?: string
    }
  }
}

export interface IDeleteDisciplineGroupRepository {
  delete(input: IDeleteDisciplineGroupRepository.Input): Promise<void>
}

export namespace IFindAllDisciplineGroupStudentsRepository {
  export type Input = { where: { id?: string } }
  export type Output = IStudent[]
}

export interface IFindAllDisciplineGroupStudentsRepository {
  findAllStudents(
    input: IFindAllDisciplineGroupStudentsRepository.Input,
  ): Promise<IFindAllDisciplineGroupStudentsRepository.Output>
}

export namespace IFindAllDisciplineGroupTeachersRepository {
  export type Input = { where: { id?: string } }
  export type Output = ITeacher[]
}

export interface IFindAllDisciplineGroupTeachersRepository {
  findAllTeachers(
    input: IFindAllDisciplineGroupTeachersRepository.Input,
  ): Promise<IFindAllDisciplineGroupTeachersRepository.Output>
}
