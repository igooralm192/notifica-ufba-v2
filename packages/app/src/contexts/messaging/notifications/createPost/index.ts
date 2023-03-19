import { useToast } from '@/contexts/toast'
import { useNavigation } from '@/helpers'
import { getRouteByName } from '@/utils/navigation'

import { useQueryClient } from 'react-query'

import { CreatePostNotificationParams } from './types'

export const useCreatePostNotification = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const toast = useToast()

  const showNotification = async (
    title: string,
    body: string,
    params: CreatePostNotificationParams,
  ) => {
    toast.notification(title, body, () => handleTap(params))
  }

  const navigateToMural = ({
    disciplineGroupId,
  }: CreatePostNotificationParams) => {
    navigation.navigate('DisciplineGroupTabsScreen', {
      disciplineGroupId,
      initialTab: 'mural',
    })
  }

  const handleTap = (params: CreatePostNotificationParams) => {
    if (getRouteByName(navigation.getState(), 'DisciplineGroupTabsScreen'))
      return

    return navigateToMural(params)
  }

  const handleReceive = (
    title: string,
    body: string,
    params: CreatePostNotificationParams,
  ) => {
    queryClient.invalidateQueries([
      'disciplineGroupPosts',
      params.disciplineGroupId,
    ])

    if (getRouteByName(navigation.getState(), 'DisciplineGroupTabsScreen'))
      return

    showNotification(title, body, params)
  }

  return { onTap: handleTap, onReceive: handleReceive }
}
