import { ErrorBoundary } from '@/components/ErrorBoundary'
import { AllProviders } from '@/components/Providers'
import Routes from '@/routes'

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3 } },
})

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AllProviders>
          <Routes />
        </AllProviders>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
