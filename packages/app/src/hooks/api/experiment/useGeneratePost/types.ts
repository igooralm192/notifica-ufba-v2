import { IGeneratePostEndpoint } from '@/api/experiment/types'

export namespace IUseGeneratePost {
  export type Params = IGeneratePostEndpoint.Params

  export type Output = {
    isGenerating: boolean
    generate: (input: Params) => Promise<any>
  }
}
