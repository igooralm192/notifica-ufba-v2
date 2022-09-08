import { ICreateMessagingService } from '@/data/contracts'

import { Expo, ExpoPushMessage } from 'expo-server-sdk'

export class ExpoMessagingService implements ICreateMessagingService {
  private readonly client = new Expo({})

  async create(input: ICreateMessagingService.Input): Promise<void> {
    const { title, body, data, tokens } = input

    const message: ExpoPushMessage = {
      to: tokens || [],
      title,
      body,
      data,
      sound: 'default',
    }

    await this.client.sendPushNotificationsAsync([message])
  }
}
