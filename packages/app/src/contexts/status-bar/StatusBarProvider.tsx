import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from '@rneui/themed'
import React, { useCallback, useContext, useState } from 'react'
import { StatusBar } from 'react-native'

export type StatusBarTheme = 'light' | 'primary'

export interface StatusBarContextData {
  theme: StatusBarTheme
  setTheme: (theme: StatusBarTheme) => void
}

const StatusBarContext = React.createContext({} as StatusBarContextData)

export const StatusBarProvider: React.FC = ({ children }) => {
  const { theme } = useTheme()

  const [statusBarTheme, setStatusBarTheme] = useState<StatusBarTheme>('light')

  return (
    <StatusBarContext.Provider
      value={{ theme: statusBarTheme, setTheme: setStatusBarTheme }}
    >
      <StatusBar
        backgroundColor={
          statusBarTheme === 'light' ? theme.colors.white : theme.colors.primary
        }
        barStyle={statusBarTheme === 'light' ? 'dark-content' : 'light-content'}
      />
      {children}
    </StatusBarContext.Provider>
  )
}

export const useStatusBar = (theme: StatusBarTheme = 'primary') => {
  const statusBar = useContext(StatusBarContext)
  const { theme: appTheme } = useTheme()

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(theme === 'light' ? appTheme.colors.white : appTheme.colors.primary)
      StatusBar.setBarStyle(theme === 'light' ? 'dark-content' : 'light-content')
      statusBar.setTheme(theme)
    }, [theme]),
  )

  return statusBar
}
