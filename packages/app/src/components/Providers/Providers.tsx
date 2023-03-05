import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ApiProvider } from '@/contexts/api'
import { AuthProvider } from '@/contexts/auth'
import { StatusBarProvider } from '@/contexts/status-bar'
import { ToastProvider, useToast } from '@/contexts/toast'
import { themeOptions } from '@/styles/theme'
import { AppNavigation } from '@/types/navigation'
import { assertIsError } from '@/utils/error'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter'
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat'
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins'
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
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query'
import { QueryCache, MutationCache } from 'react-query/core'
import { ThemeProvider as StyledProvider } from 'styled-components/native'

export const LayoutProvider: React.FC = ({ children }) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>
}

export const UIProvider: React.FC = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
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
  const insets = useSafeAreaInsets()
  const { theme, updateTheme } = useTheme()

  useEffect(() => {
    updateTheme(theme => ({ ...theme, insets }))
  }, [insets])

  return <StyledProvider theme={theme}>{children}</StyledProvider>
}

export const AlertProvider: React.FC = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>
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

  return (
    <NavigationContainer ref={navigationRef} linking={linking} theme={theme}>
      {children}
    </NavigationContainer>
  )
}

export const HttpProvider: React.FC = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        retry: 3,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.error({error})
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, variables, context, mutation) => {
        console.error({error})
      },
    }),
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export const ErrorProvider: React.FC = ({ children }) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const handleError = (error: unknown) => {
    assertIsError(error)
    toast.error(error.message)
  }

  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        onError: handleError,
      },
      mutations: {
        onError: handleError
      },
    })
  }, [])

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
