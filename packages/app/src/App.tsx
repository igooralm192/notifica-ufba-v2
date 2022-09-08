import { AllProviders } from '@/components/Providers'
import env from '@/config/env'
import { BaseError } from '@/helpers'
import Routes from '@/routes'

import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import Toast from 'react-native-toast-message'
import { Options, Provider as HttpProvider } from 'use-http'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const App: React.FC = () => {
  return (
    <RecoilRoot >
      <RecoilNexus/>
      <ErrorBoundary>
        <AllProviders>
          <Routes />
        </AllProviders>
      </ErrorBoundary>
    </RecoilRoot>
  )
}

export default App
