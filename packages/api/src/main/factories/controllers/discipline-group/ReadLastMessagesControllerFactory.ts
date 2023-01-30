import { ReadLastMessagesController } from '@/application/controllers/discipline-group'
import { makeListParamsParser } from '@/main/factories/parsers'
import { makeReadLastMessagesUseCase } from '@/main/factories/usecases'

export const makeReadLastMessagesController = () => {
  const listParamsParser = makeListParamsParser()
  const readDisciplinesUseCase = makeReadLastMessagesUseCase()

  return new ReadLastMessagesController(
    listParamsParser,
    readDisciplinesUseCase,
  )
}
