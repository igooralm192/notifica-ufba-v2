import { useAuth } from '@/contexts/auth'
import { useToast } from '@/contexts/toast'
import { useUpdateMyUser } from '@/hooks/api'
import { AuthState } from '@/store/auth/types'
import * as Notifications from 'expo-notifications'
import React, { useContext, useEffect } from 'react'
import { Platform } from 'react-native'

import appConfig from '../../../app.config'
import { NotificationData } from './types'
import { useMessagingListeners } from './useMessagingListeners'

export interface MessagingContextData {}

const MessagingContext = React.createContext({} as MessagingContextData)

export const MessagingProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const auth = useAuth()
  const toast = useToast()

  const { onReceiveNotification, onTapNotification } = useMessagingListeners()

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
          onTapNotification({
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

        if (title && body && data) {
          onReceiveNotification({
            title,
            body,
            data: data as NotificationData,
          })
        }
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

      if (data) onTapNotification({ data: data as NotificationData })
    })
  }, [auth.state])

  useEffect(() => {
    if (auth.state !== AuthState.AUTHENTICATED) return

    requestPermissionsAndGetToken().then(pushToken => {
      if (pushToken) return update({ pushToken })
    })
  }, [auth.state])

  return (
    <MessagingContext.Provider value={{}}>{children}</MessagingContext.Provider>
  )
}

export const useMessaging = () => useContext(MessagingContext)
