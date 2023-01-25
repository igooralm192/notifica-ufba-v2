import { IPatchMyTeacherEndpoint } from '@/api/teacher/types'

export namespace IUseUpdateTeacher {
  export type Body = IPatchMyTeacherEndpoint.Body

  export type Output = {
    isUpdating: boolean
    update: (input: Body) => Promise<IPatchMyTeacherEndpoint.Response>
  }
}
