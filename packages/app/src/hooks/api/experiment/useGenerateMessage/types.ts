import { IGenerateMessageEndpoint } from '@/api/experiment/types'

export namespace IUseGenerateMessage {
  export type Params = IGenerateMessageEndpoint.Params

  export type Output = {
    isGenerating: boolean
    generate: (input: Params) => Promise<any>
  }
}
