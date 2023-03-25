import { Providers } from '@/components/Providers'
import Routes from '@/routes'
import { getProviderStore } from '@/state/zustand/provider'

import * as SentryNative from '@sentry/react-native'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as Sentry from 'sentry-expo'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

Sentry.init({
  dsn: 'https://f1c9e1659ccd415eb67af0751dc68303@o4504024240029696.ingest.sentry.io/4504024240881664',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

const App: React.FC = () => {
  useEffect(() => {
    return getProviderStore().subscribe(async store => {
      const providerStates = [store.fonts]

      if (providerStates.every(p => p === 'ready')) {
        await SplashScreen.hideAsync()
      }
    })
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <Routes />
      </Providers>
    </GestureHandlerRootView>
  )
}

export default SentryNative.wrap(App)
