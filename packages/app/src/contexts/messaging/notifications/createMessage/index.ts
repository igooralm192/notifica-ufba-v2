import { useToast } from '@/contexts/toast'
import { useNavigation } from '@/helpers'
import { getRouteByName } from '@/utils/navigation'

import { useQueryClient } from 'react-query'

import { CreateMessageNotificationParams } from './types'

export const useCreateMessageNotification = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const toast = useToast()

  const showNotification = async (
    title: string,
    body: string,
    params: CreateMessageNotificationParams,
  ) => {
    toast.notification(title, body, () => handleTap(params))
  }

  const navigateToChat = ({
    disciplineGroupId,
  }: CreateMessageNotificationParams) => {
    navigation.navigate('DisciplineGroupTabsScreen', {
      disciplineGroupId,
      initialTab: 'chat',
    })
  }

  const handleTap = (params: CreateMessageNotificationParams) => {
    if (getRouteByName(navigation.getState(), 'DisciplineGroupTabsScreen'))
      return

    return navigateToChat(params)
  }

  const handleReceive = (
    title: string,
    body: string,
    params: CreateMessageNotificationParams,
  ) => {
    queryClient.invalidateQueries([
      'disciplineGroupMessages',
      params.disciplineGroupId,
    ])

    if (getRouteByName(navigation.getState(), 'DisciplineGroupTabsScreen'))
      return

    showNotification(title, body, params)
  }

  return { onTap: handleTap, onReceive: handleReceive }
}
