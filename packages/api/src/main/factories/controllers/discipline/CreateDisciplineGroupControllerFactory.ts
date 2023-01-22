import { CreateDisciplineGroupController } from "@/application/controllers/discipline/create-discipline-group"
import { makeCreateDisciplineGroupUseCase } from "@/main/factories/usecases"
import { makeCreateDisciplineGroupValidation } from "@/main/factories/validation"

export const makeCreateDisciplineGroupController = () => {
  const validation = makeCreateDisciplineGroupValidation()
  const createDisciplineGroupUseCase = makeCreateDisciplineGroupUseCase()

  return new CreateDisciplineGroupController(validation, createDisciplineGroupUseCase)
}
