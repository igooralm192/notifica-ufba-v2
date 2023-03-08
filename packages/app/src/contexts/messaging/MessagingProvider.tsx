import { useAuth } from '@/contexts/auth'
import { useToast } from '@/contexts/toast'
import { useNavigation } from '@/helpers'
import { useUpdateMyUser } from '@/hooks/api'
import { AuthState } from '@/store/auth/types'
import { getRouteByName } from '@/utils/navigation'

import * as Notifications from 'expo-notifications'
import React, { useContext, useEffect } from 'react'
import { Platform } from 'react-native'

import appConfig from '../../../app.config'
export interface MessagingContextData {
  showNotification: (title: string, body: string) => void
}

export type ReceiveNotificationArgs = {
  title: string
  body: string
  data: NotificationData
}

export type TapNotificationArgs = {
  data: NotificationData
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
  const toast = useToast()

  const { update } = useUpdateMyUser()

  const requestPermissions = async () => {
    const { status: currentStatus } = await Notifications.getPermissionsAsync()
    if (currentStatus === 'granted') return true

    const { status } = await Notifications.requestPermissionsAsync()
    return status === 'granted'
  }

  const requestPermissionsAndGetToken = async () => {
    const permissionsGranted = await requestPermissions()

    if (!permissionsGranted) {
      toast.error(
        'Para receber notificações, ative as permissões para este app nas configurações do seu celular.',
      )

      return null
    }

    const projectId = appConfig?.expo?.extra?.eas?.projectId

    const { data: token } = await Notifications.getExpoPushTokenAsync({
      projectId,
    })

    return token
  }

  const showNotification = async (
    title: string,
    body: string,
    data?: Record<string, any>,
  ) => {
    toast.notification(title, body, () => {
      navigateToDisciplineGroupTabs(data as NotificationData)
    })
  }

  const navigateToDisciplineGroupTabs = (data: NotificationData) => {
    navigation.navigate('DisciplineGroupTabsScreen', {
      disciplineGroupId: data.disciplineGroupId,
      initialTab: data.type === 'post' ? 'mural' : 'chat',
    })
  }

  const handleReceiveNotification = ({
    title,
    body,
    data,
  }: ReceiveNotificationArgs) => {
    if (!data.type) return

    switch (data.type) {
      case 'post':
      case 'message': {
        if (getRouteByName(navigation.getState(), 'DisciplineGroupTabsScreen'))
          return
      }
      default:
        showNotification(title, body, data)
    }
  }

  const handleTapNotification = ({ data }: TapNotificationArgs) => {
    if (!data.type) return

    switch (data.type) {
      case 'post':
      case 'message': {
        if (getRouteByName(navigation.getState(), 'DisciplineGroupTabsScreen'))
          return

        navigateToDisciplineGroupTabs(data)
      }
      default:
        return
    }
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
    // Handle Expo notifications ON TAP IN BACKGROUND STATE
    const onTapListener = Notifications.addNotificationResponseReceivedListener(
      ({ notification }) => {
        const { data } = notification.request.content

        if (data)
          handleTapNotification({
            data: data as NotificationData,
          })
      },
    )

    return () => {
      Notifications.removeNotificationSubscription(onTapListener)
    }
  }, [])

  useEffect(() => {
    // Handle Expo notifications ON RECEIVE IN FOREGROUND STATE
    const onForegroundListener = Notifications.addNotificationReceivedListener(
      notification => {
        const { title, body, data } = notification.request.content

        if (title && body && data)
          handleReceiveNotification({
            title,
            body,
            data: data as NotificationData,
          })
      },
    )

    return () => {
      Notifications.removeNotificationSubscription(onForegroundListener)
    }
  }, [])

  useEffect(() => {
    // Handle Expo notifications ON TAP IN KILLED STATE
    Notifications.getLastNotificationResponseAsync().then(notification => {
      if (notification == null) return

      const { data } = notification.notification.request.content

      if (data) handleTapNotification({ data: data as NotificationData })
    })
  }, [])

  useEffect(() => {
    if (auth.state !== AuthState.AUTHENTICATED) return

    requestPermissionsAndGetToken().then(pushToken => {
      if (pushToken) return update({ pushToken })
    })
  }, [auth.state])

  return (
    <MessagingContext.Provider value={{ showNotification }}>
      {children}
    </MessagingContext.Provider>
  )
}

export const useMessaging = () => useContext(MessagingContext)
