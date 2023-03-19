import { CreateMessageNotificationParams } from './notifications/createMessage/types'
import { CreatePostNotificationParams } from './notifications/createPost/types'
import { RemoveMemberNotificationParams } from './notifications/removeMember/types'

export type ReceiveNotificationArgs = {
  title: string
  body: string
  data: NotificationData
}

export type TapNotificationArgs = {
  data: NotificationData
}

export type NotificationData =
  | {
      type: 'createPost'
      params: CreatePostNotificationParams
    }
  | {
      type: 'createMessage'
      params: CreateMessageNotificationParams
    }
  | {
      type: 'removeMember'
      params: RemoveMemberNotificationParams
    }
