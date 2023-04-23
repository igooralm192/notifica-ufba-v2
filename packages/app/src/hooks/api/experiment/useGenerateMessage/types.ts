import { IGenerateMessageEndpoint } from '@/api/experiment/types'

export namespace IUseGenerateMessage {
  export type Body = IGenerateMessageEndpoint.Request

  export type Output = {
    isGenerating: boolean
    generate: (input: Body) => Promise<any>
  }
}
