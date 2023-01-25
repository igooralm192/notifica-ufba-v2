import { ITeacher } from "@shared/entities";

export namespace IPatchMyTeacherEndpoint {
  export interface Body {
    name?: string
  }

  export interface Response {
    teacher: ITeacher
  }
}
