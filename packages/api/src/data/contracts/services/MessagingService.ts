export namespace ICreateMessagingService {
  export type Input = {
    title: string
    body: string
    data?: Record<string, any>
    topics?: string[]
    tokens?: string[]
  }

  export type Output = void
}

export interface ICreateMessagingService {
  create(
    input: ICreateMessagingService.Input,
  ): Promise<ICreateMessagingService.Output>
}
