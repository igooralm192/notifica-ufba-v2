import { GeneratePostController } from '@/application/controllers/experiment'
import { makeGeneratePostUseCase } from '@/main/factories/usecases'

export const makeGeneratePostController = () => {
  const generatePostUseCase = makeGeneratePostUseCase()

  return new GeneratePostController(generatePostUseCase)
}
