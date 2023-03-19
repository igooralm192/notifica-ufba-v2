import { useCreateMessageNotification } from './notifications/createMessage'
import { useCreatePostNotification } from './notifications/createPost'
import { useRemoveMemberNotification } from './notifications/removeMember'
import { ReceiveNotificationArgs, TapNotificationArgs } from './types'

export const useMessagingListeners = () => {
  const createPostNotification = useCreatePostNotification()
  const createMessageNotification = useCreateMessageNotification()
  const removeMemberNotification = useRemoveMemberNotification()

  const handleTapNotification = ({ data }: TapNotificationArgs) => {
    if (!data.type) return

    switch (data.type) {
      case 'createPost':
        return createPostNotification.onTap(data.params)

      case 'createMessage':
        return createMessageNotification.onTap(data.params)

      case 'removeMember':
        return removeMemberNotification.onTap(data.params)

      default:
        return
    }
  }

  const handleReceiveNotification = ({
    title,
    body,
    data,
  }: ReceiveNotificationArgs) => {
    if (!data.type) return

    switch (data.type) {
      case 'createPost':
        return createPostNotification.onReceive(title, body, data.params)

      case 'createMessage':
        return createMessageNotification.onReceive(title, body, data.params)

      case 'removeMember':
        return removeMemberNotification.onReceive(title, body, data.params)

      default:
        return
    }
  }

  return {
    onTapNotification: handleTapNotification,
    onReceiveNotification: handleReceiveNotification,
  }
}
