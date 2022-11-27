import { FullLoading } from '@/components/FullLoading'
import { ApiProvider } from '@/contexts/api'
import { AuthProvider } from '@/contexts/auth'
import { MeProvider } from '@/contexts/me'
import { MessagingProvider } from '@/contexts/messaging'
import { StatusBarProvider } from '@/contexts/status-bar'
import store from '@/store'
import { themeOptions } from '@/styles/theme'
import { AppNavigation } from '@/types/navigation'
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand'
import {
  DefaultTheme,
  NavigationContainer,
  createNavigationContainerRef,
  LinkingOptions,
} from '@react-navigation/native'
import { ThemeProvider, useTheme } from '@rneui/themed'

import AppLoading from 'expo-app-loading'
import * as Linking from 'expo-linking'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider as StyledProvider } from 'styled-components/native'

export const LayoutProvider: React.FC = ({ children }) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>
}

export const UIProvider: React.FC = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>
}

export const StyleProvider: React.FC = ({ children }) => {
  const { theme } = useTheme()

  return <StyledProvider theme={theme}>{children}</StyledProvider>
}

export const AlertProvider: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <Toast />
    </>
  )
}

export const navigationRef = createNavigationContainerRef<AppNavigation>()

const urlPrefix = Linking.createURL('/')

export const NavigationProvider: React.FC = ({ children }) => {
  const linking: LinkingOptions<AppNavigation> = {
    prefixes: [urlPrefix, 'https://notificaufba.page.link'],
    config: {
      screens: {
        ResetPasswordScreen: 'forgot-password',
      },
    },
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF',
    },
  }

  Linking.getInitialURL().then(async url => {
    if (!url) return

    const canOpen = await Linking.canOpenURL(url)

    if (canOpen) {
      Linking.openURL(url)
    }
  })

  return (
    <NavigationContainer ref={navigationRef} linking={linking} theme={theme}>
      {children}
    </NavigationContainer>
  )
}

export const AllProviders: React.FC = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <LayoutProvider>
        <UIProvider>
          <StyleProvider>
            <NavigationProvider>
              <AlertProvider>
                <AuthProvider>
                  <ApiProvider>
                    <StatusBarProvider>{children}</StatusBarProvider>
                  </ApiProvider>
                </AuthProvider>
              </AlertProvider>
            </NavigationProvider>
          </StyleProvider>
        </UIProvider>
      </LayoutProvider>
    </ReduxProvider>
  )
}
