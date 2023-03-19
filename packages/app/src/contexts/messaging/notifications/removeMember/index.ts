import { useToast } from '@/contexts/toast'
import { useNavigation } from '@/helpers'
import { getMessagingStore } from '@/state/zustand/messaging'

import { RemoveMemberNotificationParams } from './types'

export const useRemoveMemberNotification = () => {
  const navigation = useNavigation()
  const toast = useToast()

  const showNotification = async (
    title: string,
    body: string,
    params: RemoveMemberNotificationParams,
  ) => {
    toast.notification(title, body, () => handleTap(params))
  }

  const navigateToGroupInfo = ({
    disciplineGroupId,
  }: RemoveMemberNotificationParams) => {
    navigation.navigate('DisciplineGroupInfoScreen', {
      disciplineGroupId,
    })
  }

  const handleTap = (params: RemoveMemberNotificationParams) => {
    getMessagingStore().setState({
      removeMemberMessage: { disciplineGroupId: params.disciplineGroupId },
    })

    return navigateToGroupInfo(params)
  }

  const handleReceive = (
    title: string,
    body: string,
    params: RemoveMemberNotificationParams,
  ) => {
    getMessagingStore().setState({
      removeMemberMessage: { disciplineGroupId: params.disciplineGroupId },
    })

    showNotification(title, body, params)
  }

  return { onTap: handleTap, onReceive: handleReceive }
}
