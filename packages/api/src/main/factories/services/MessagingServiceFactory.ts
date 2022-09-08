import { ICreateMessagingService } from '@/data/contracts'
import { ExpoMessagingService } from '@/infra/services/expo/ExpoMessagingService'

type MessagingService = ICreateMessagingService

export const makeMessagingService = (): MessagingService => {
  return new ExpoMessagingService()
}
