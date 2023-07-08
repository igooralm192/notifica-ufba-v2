import { Providers } from '@/components/Providers'
import Routes from '@/routes'
import { getProviderStore } from '@/state/zustand/provider'

import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

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

export default App
