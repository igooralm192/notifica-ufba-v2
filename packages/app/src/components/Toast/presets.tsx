import React from 'react'
import Toast, { ToastTextProps } from '@/components/Toast'
import { ThemeOptions, useTheme } from '@rneui/themed'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface BaseToastProps {
  color: keyof Omit<ThemeOptions['colors'], 'platform'>
  iconName: string
  title?: string
  description?: string
}

function BaseToast({ color, iconName, title, description }: BaseToastProps) {
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()

  return (
    <Toast.Root style={{ backgroundColor: theme.colors[color], paddingTop: insets.top + 16 }}>
      <Toast.Icon name={iconName} />

      <Toast.Text title={title} description={description || ''} />
    </Toast.Root>
  )
}

export function SuccessToast(props: ToastTextProps) {
  return <BaseToast {...props} color="success" iconName="check-circle" />
}

export function ErrorToast(props: ToastTextProps) {
  return <BaseToast {...props} color="error" iconName="close-circle" />
}

export function InfoToast(props: ToastTextProps) {
  return <BaseToast {...props} color="info" iconName="information" />
}

export function WarningToast(props: ToastTextProps) {
  return <BaseToast {...props} color="warning" iconName="alert" />
}
