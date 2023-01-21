import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ApiProvider } from '@/contexts/api'
import { AuthProvider } from '@/contexts/auth'
import { StatusBarProvider } from '@/contexts/status-bar'
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
import { QueryClient, QueryClientProvider } from 'react-query'
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

const urlPrefix = Linking.createURL('nufba')

export const NavigationProvider: React.FC = ({ children }) => {
  const linking: LinkingOptions<AppNavigation> = {
    prefixes: [urlPrefix, 'nufba://nufba', 'https://notificaufba.page.link'],
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

  const [error, setError] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setError(true)
    }, 3000)
  }, [])

  if (error) throw new Error('Eae')

  return (
    <NavigationContainer ref={navigationRef} linking={linking} theme={theme}>
      {children}
    </NavigationContainer>
  )
}

export const HttpProvider: React.FC = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 3 } },
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export const ErrorProvider: React.FC = ({ children }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>
}

export const AllProviders: React.FC = ({ children }) => {
  return (
    <HttpProvider>
      <LayoutProvider>
        <UIProvider>
          <StyleProvider>
            <AlertProvider>
              <StatusBarProvider>
                <ErrorProvider>
                  <NavigationProvider>
                    <AuthProvider>
                      <ApiProvider>{children}</ApiProvider>
                    </AuthProvider>
                  </NavigationProvider>
                </ErrorProvider>
              </StatusBarProvider>
            </AlertProvider>
          </StyleProvider>
        </UIProvider>
      </LayoutProvider>
    </HttpProvider>
  )
}
