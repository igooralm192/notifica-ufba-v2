import api from '@/api'
import { useAuth } from '@/contexts/auth'
import { useNavigation } from '@/helpers'
import { AuthState } from '@/store/auth/types'

import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import React, { useContext, useEffect } from 'react'
import { Platform } from 'react-native'
import Toast from 'react-native-toast-message'

export interface MessagingContextData {}

const MessagingContext = React.createContext({} as MessagingContextData)

export const MessagingProvider: React.FC = ({ children }) => {
  const auth = useAuth()
  const navigation = useNavigation()

  const requestPermissions = async () => {
    const { status: currentStatus } = await Notifications.getPermissionsAsync()

    if (currentStatus === 'granted') return true

    const { status } = await Notifications.requestPermissionsAsync()

    return status === 'granted'
  }

  const requestPermissionsAndGetToken = async () => {
    // if (!Device.isDevice) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Must use physical device for Push Notifications',
    //   })

    //   return null
    // }

    const permissionsGranted = await requestPermissions()

    if (!permissionsGranted) {
      Toast.show({
        type: 'error',
        text1: 'Failed to get push token for push notification!',
      })

      return null
    }

    const { data: token } = await Notifications.getExpoPushTokenAsync()

    return token
  }

  const navigateToDisciplineGroupTabs = (data: any) => {
    navigation.navigate('DisciplineGroupTabsScreen', {
      disciplineGroupId: data.disciplineGroupId as string,
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
      if (pushToken) return api.user.patchMyUser({ pushToken })
    })
  }, [auth.state])

  useEffect(() => {
    const onForegroundListener = Notifications.addNotificationReceivedListener(
      notification => {
        const { title, body, data } = notification.request.content

        Toast.show({
          type: 'info',
          text1: title || undefined,
          text2: body || undefined,
          onPress: () => {
            navigateToDisciplineGroupTabs(data)
            Toast.hide()
          },
        })
      },
    )

    const onTapListener = Notifications.addNotificationResponseReceivedListener(
      ({ notification }) => {
        const { data } = notification.request.content

        navigateToDisciplineGroupTabs(data)
      },
    )

    return () => {
      Notifications.removeNotificationSubscription(onForegroundListener)
      Notifications.removeNotificationSubscription(onTapListener)
    }
  }, [])

  return (
    <MessagingContext.Provider value={{}}>{children}</MessagingContext.Provider>
  )
}

export const useMessaging = () => useContext(MessagingContext)
