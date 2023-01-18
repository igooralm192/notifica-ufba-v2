import { ErrorBoundary } from '@/components/ErrorBoundary'
import { AllProviders } from '@/components/Providers'
import Routes from '@/routes'

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import * as Sentry from 'sentry-expo'
import * as SentryNative from '@sentry/react-native'
import env from '@/config/env'
import { Text } from 'react-native'


console.log({API_URL: process.env.API_URL})

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3 } },
})

Sentry.init({
  dsn: 'https://f1c9e1659ccd415eb67af0751dc68303@o4504024240029696.ingest.sentry.io/4504024240881664',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AllProviders>
          <Text>{env.API_URL}</Text>
          <Routes />
        </AllProviders>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default SentryNative.wrap(App)
