import { IPatchMyStudentEndpoint } from '@/api/student/types'

export namespace IUseUpdateStudent {
  export type Body = IPatchMyStudentEndpoint.Body

  export type Output = {
    isUpdating: boolean
    update: (input: Body) => Promise<IPatchMyStudentEndpoint.Response>
  }
}
