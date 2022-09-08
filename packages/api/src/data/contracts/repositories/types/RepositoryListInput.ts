import { RepositoryWhereInput } from './RepositoryWhereInput'

export interface RepositoryListInput {
  where?: RepositoryWhereInput
  take?: number
  skip?: number
  include?: {
    [key: string]: boolean | RepositoryListInput
  }
}
