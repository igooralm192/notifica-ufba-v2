export namespace IStorageService {
  export namespace Save {
    export interface Input {
      path: string
      file: {
        originalName: string
        buffer: Buffer
        destinationName: string
      }
    }

    export interface Output {
      url: string
    }
  }

  export interface Save {
    save: (input: Save.Input) => Promise<Save.Output>
  }

  export namespace GetFileUrl {
    export interface Input {
      path: string
      filename: string
    }

    export interface Output {
      url: string
    }
  }

  export interface GetFileUrl {
    getFileUrl: (input: GetFileUrl.Input) => Promise<GetFileUrl.Output>
  }
}
