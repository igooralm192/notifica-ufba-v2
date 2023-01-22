import { useAuth } from '@/contexts/auth'
import { useNavigation } from '@/helpers'
import { useUpdateMyUser } from '@/hooks/api'
import { AuthState } from '@/store/auth/types'
import { getRouteByName } from '@/utils/navigation'

import { useNavigationState } from '@react-navigation/core'
import * as Notifications from 'expo-notifications'
import React, { useContext, useEffect } from 'react'
import { Platform } from 'react-native'
import Toast from 'react-native-toast-message'

export interface MessagingContextData {
  showNotification: (title: string, body: string) => void
}

export type NotificationData = {
  type: 'message' | 'post'
  disciplineGroupId: string
  disciplineGroupCode: string
  disciplineCode: string
  disciplineName: string
}

const MessagingContext = React.createContext({} as MessagingContextData)

export const MessagingProvider: React.FC = ({ children }) => {
  const auth = useAuth()
  const navigation = useNavigation()

  const { update } = useUpdateMyUser()

  const showNotification = (title: string, body: string) => {
    Toast.show({
      type: 'info',
      text1: title || undefined,
      text2: body || undefined,
    })
  }

  const requestPermissions = async () => {
    const { status: currentStatus } = await Notifications.getPermissionsAsync()

    if (currentStatus === 'granted') return true

    const { status } = await Notifications.requestPermissionsAsync()

    return status === 'granted'
  }

  const requestPermissionsAndGetToken = async () => {
    const permissionsGranted = await requestPermissions()

    if (!permissionsGranted) {
      Toast.show({
        type: 'error',
        text1: 'Permissão insuficiente para notificaćões',
        text2:
          'Para receber notificações, ative as permissões para este app nas configurações do seu celular.',
      })

      return null
    }

    const { data: token } = await Notifications.getExpoPushTokenAsync()

    return token
  }

  const navigateToDisciplineGroupTabs = (data: NotificationData) => {
    navigation.navigate('DisciplineGroupTabsScreen', {
      disciplineGroupId: data.disciplineGroupId,
      initialTab: data.type === 'post' ? 'mural' : 'chat',
    })
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }
  }, [])

  useEffect(() => {
    if (auth.state !== AuthState.AUTHENTICATED) return

    requestPermissionsAndGetToken().then(pushToken => {
      if (pushToken) return update({ pushToken })
    })
  }, [auth.state])

  useEffect(() => {
    const onForegroundListener = Notifications.addNotificationReceivedListener(
      notification => {
        const { title, body, data } = notification.request.content

        if (!data.type) return
        if (getRouteByName(navigation.getState(), 'DisciplineGroupTabsScreen'))
          return

        Toast.show({
          type: 'info',
          text1: title || undefined,
          text2: body || undefined,
          onPress: () => {
            navigateToDisciplineGroupTabs(data as NotificationData)
            Toast.hide()
          },
        })
      },
    )

    const onTapListener = Notifications.addNotificationResponseReceivedListener(
      ({ notification }) => {
        const { data } = notification.request.content

        if (!!data.type) navigateToDisciplineGroupTabs(data as NotificationData)
      },
    )

    return () => {
      Notifications.removeNotificationSubscription(onForegroundListener)
      Notifications.removeNotificationSubscription(onTapListener)
    }
  }, [auth.state])

  return (
    <MessagingContext.Provider value={{ showNotification }}>
      {children}
    </MessagingContext.Provider>
  )
}

export const useMessaging = () => useContext(MessagingContext)
