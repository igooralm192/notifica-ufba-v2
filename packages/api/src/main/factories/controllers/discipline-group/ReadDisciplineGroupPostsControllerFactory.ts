import { ReadDisciplineGroupPostsController } from '@/application/controllers/discipline-group'
import { makeListParamsParser } from '@/main/factories/parsers'
import { makeReadDisciplineGroupPostsUseCase } from '@/main/factories/usecases'

export const makeReadDisciplineGroupPostsController = () => {
  const listParamsParser = makeListParamsParser()
  const readDisciplineGroupPostsUseCase = makeReadDisciplineGroupPostsUseCase()

  return new ReadDisciplineGroupPostsController(
    listParamsParser,
    readDisciplineGroupPostsUseCase,
  )
}
