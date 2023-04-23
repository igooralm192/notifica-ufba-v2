import { IGeneratePostEndpoint } from '@/api/experiment/types'

export namespace IUseGeneratePost {
  export type Body = IGeneratePostEndpoint.Request

  export type Output = {
    isGenerating: boolean
    generate: (input: Body) => Promise<any>
  }
}
