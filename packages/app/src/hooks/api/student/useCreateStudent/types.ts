import { ICreateStudentEndpoint } from '@/api/student/types'

export namespace IUseCreateStudent {
  export type Body = ICreateStudentEndpoint.Request

  export type Output = {
    isCreating: boolean
    create: (input: Body) => Promise<ICreateStudentEndpoint.Response>
  }
}
