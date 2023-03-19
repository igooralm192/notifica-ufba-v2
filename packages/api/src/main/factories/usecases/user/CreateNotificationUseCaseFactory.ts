import { CreateNotificationUseCase } from '@/data/usecases/user'
import { makeUserRepository } from '@/main/factories/repositories'
import { makeMessagingService } from '@/main/factories/services'

export const makeCreateNotificationUseCase = () => {
  const userRepository = makeUserRepository()
  const messagingService = makeMessagingService()
  
  return new CreateNotificationUseCase(userRepository, messagingService)
}
