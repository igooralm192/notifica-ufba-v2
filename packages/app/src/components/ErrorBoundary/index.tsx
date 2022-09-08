import { BaseError } from '@/helpers'
import { Text } from '@rneui/themed'
import React from 'react'
import Toast from 'react-native-toast-message'

export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(err: any, errorInfo: any) {
    console.log('ERRO', err)
    if (err.code !== undefined) {
      const error = err as BaseError

      Toast.show({
        type: 'error',
        text1: error.description ?? 'Erro ao realizar operacão.',
        text2: error.message,
      })
    }
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Text>Something went wrong.</Text>
    }

    // @ts-ignore
    // eslint-disable-next-line react/prop-types
    return this.props.children
  }
}
