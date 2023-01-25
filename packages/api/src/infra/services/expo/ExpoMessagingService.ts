import { ICreateMessagingService } from '@/data/contracts'

import { Expo, ExpoPushMessage } from 'expo-server-sdk'

export class ExpoMessagingService implements ICreateMessagingService {
  private readonly client = new Expo({})

  async create(input: ICreateMessagingService.Input): Promise<void> {
    const { title, body, data, tokens } = input

    if (tokens.length === 0) return

    const message: ExpoPushMessage = {
      to: tokens,
      title,
      body,
      data,
      sound: 'default',
      priority: 'high'
    }

    await this.client.sendPushNotificationsAsync([message])
  }
}
