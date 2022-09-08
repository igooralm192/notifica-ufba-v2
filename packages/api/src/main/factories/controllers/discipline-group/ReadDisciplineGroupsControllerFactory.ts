import { ReadDisciplineGroupsController } from '@/application/controllers/discipline-group'
import { makeListParamsParser } from '@/main/factories/parsers'
import { makeReadDisciplineGroupsUseCase } from '@/main/factories/usecases'

export const makeReadDisciplineGroupsController = () => {
  const listParamsParser = makeListParamsParser()
  const readDisciplineGroupsUseCase = makeReadDisciplineGroupsUseCase()

  return new ReadDisciplineGroupsController(
    listParamsParser,
    readDisciplineGroupsUseCase,
  )
}
