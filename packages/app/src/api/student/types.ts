import { IStudent } from '@shared/entities'

export namespace ICreateStudentEndpoint {
  export interface Request {
    name: string
    email: string
    password: string
    matriculation: string
    course: string
  }

  export interface Response {
    student: IStudent
  }
}

export namespace IPatchMyStudentEndpoint {
  export interface Body {
    name?: string
    matriculation?: string
    course?: string
  }

  export interface Response {
    student: IStudent
  }
}
