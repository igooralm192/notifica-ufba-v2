import React from 'react'
import Toast, { ToastRootProps, ToastTextProps } from '@/components/Toast'

interface BaseToastProps {
  color: ToastRootProps['color']
  iconName: string
  title?: string
  description?: string
}

function BaseToast({ color, iconName, title, description }: BaseToastProps) {
  return (
    <Toast.Root color={color}>
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
