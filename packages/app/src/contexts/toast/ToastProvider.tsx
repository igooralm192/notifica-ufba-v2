import { Notification } from '@/components/Notification'
import {
  ErrorToast,
  InfoToast,
  SuccessToast,
  WarningToast,
} from '@/components/Toast/presets'
import React, { useContext } from 'react'
import RNToast, { BaseToastProps } from 'react-native-toast-message'

export interface ToastContextData {
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
  warning: (message: string) => void
  notification: (title: string, message: string, onPress?: () => void) => void
  show: (args: ShowToastArgs) => void
}

const ToastContext = React.createContext({} as ToastContextData)

const toastConfig = {
  success: (props: BaseToastProps) => {
    return <SuccessToast title={props.text1} description={props.text2} />
  },
  error: (props: BaseToastProps) => {
    return <ErrorToast title={props.text1} description={props.text2} />
  },
  info: (props: BaseToastProps) => {
    return <InfoToast title={props.text1} description={props.text2} />
  },
  warning: (props: BaseToastProps) => {
    return <WarningToast title={props.text1} description={props.text2} />
  },
  notification: (props: BaseToastProps) => {
    return (
      <Notification
        title={props.text1 || ''}
        description={props.text2 || ''}
        onPress={props.onPress}
      />
    )
  },
}

interface ShowToastArgs {
  type: 'success' | 'error' | 'info' | 'warning' | 'notification'
  title?: string
  description?: string
  time?: number
  onPress?: () => void
}

export const ToastProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const showToast = ({
    type,
    title,
    description,
    time = 6000,
    onPress,
  }: ShowToastArgs) => {
    RNToast.show({
      type,
      text1: title,
      text2: description,
      visibilityTime: time,
      onPress: () => {
        onPress?.()
        RNToast.hide()
      },
    })
  }

  const success = (message: string) =>
    showToast({ type: 'success', description: message })

  const error = (message: string) =>
    showToast({ type: 'error', description: message })

  const info = (message: string) =>
    showToast({ type: 'info', description: message })

  const warning = (message: string) =>
    showToast({ type: 'warning', description: message })

  const notification = (title: string, message: string, onPress?: () => void) =>
    showToast({
      type: 'notification',
      title,
      description: message,
      time: 9000,
      onPress,
    })

  return (
    <ToastContext.Provider
      value={{ success, error, info, warning, notification, show: showToast }}
    >
      {children}
      <RNToast config={toastConfig} topOffset={0} />
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
