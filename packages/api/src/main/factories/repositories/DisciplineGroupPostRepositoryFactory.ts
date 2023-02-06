import { IDisciplineGroupPostRepository } from '@/data/contracts'
import { PrismaDisciplineGroupPostRepository } from '@/infra/database/prisma/repositories/discipline-group-post'

type IDisciplineGroupPostRepository = IDisciplineGroupPostRepository.Create &
  IDisciplineGroupPostRepository.Count &
  IDisciplineGroupPostRepository.FindAll &
  IDisciplineGroupPostRepository.FindOne &
  IDisciplineGroupPostRepository.Delete

export const makeDisciplineGroupPostRepository =
  (): IDisciplineGroupPostRepository => {
    return new PrismaDisciplineGroupPostRepository()
  }
