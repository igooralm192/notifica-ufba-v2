import { ReadDisciplinesController } from '@/application/controllers/discipline'
import { makeListParamsParser } from '@/main/factories/parsers'
import { makeReadDisciplinesUseCase } from '@/main/factories/usecases'

export const makeReadDisciplinesController = () => {
  const listParamsParser = makeListParamsParser()
  const readDisciplinesUseCase = makeReadDisciplinesUseCase()

  return new ReadDisciplinesController(listParamsParser, readDisciplinesUseCase)
}
