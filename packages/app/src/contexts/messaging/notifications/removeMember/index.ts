import { useToast } from '@/contexts/toast'
import { useNavigation } from '@/helpers'
import { AppNavigation } from '@/types/navigation'
import { getRouteByName, removeRoute } from '@/utils/navigation'

import { CommonActions } from '@react-navigation/native'
import { useQueryClient } from 'react-query'

import { RemoveMemberNotificationParams } from './types'

export const useRemoveMemberNotification = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
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
    if (getRouteByName(navigation.getState(), 'DisciplineGroupTabsScreen'))
      return

    return navigateToGroupInfo(params)
  }

  const handleReceive = (
    title: string,
    body: string,
    params: RemoveMemberNotificationParams,
  ) => {
    queryClient.invalidateQueries(['disciplineGroups'])

    const route = getRouteByName(
      navigation.getState(),
      'DisciplineGroupTabsScreen',
    )

    const disciplineGroupTabsParams = route?.params as
      | AppNavigation['DisciplineGroupTabsScreen']
      | null

    if (
      disciplineGroupTabsParams?.disciplineGroupId === params.disciplineGroupId
    ) {
      navigation.dispatch(state =>
        CommonActions.reset(
          removeRoute(state, r => r.name === 'DisciplineGroupTabsScreen'),
        ),
      )
    }

    showNotification(title, body, params)
  }

  return { onTap: handleTap, onReceive: handleReceive }
}
