import { IDisciplineGroupPostRepository } from '@/data/contracts'
import { PrismaDisciplineGroupPostRepository } from '@/infra/database/prisma/repositories/discipline-group-post'

type IDisciplineGroupPostRepository = IDisciplineGroupPostRepository.Create &
  IDisciplineGroupPostRepository.FindAllByDisciplineGroupId

export const makeDisciplineGroupPostRepository =
  (): IDisciplineGroupPostRepository => {
    return new PrismaDisciplineGroupPostRepository()
  }
