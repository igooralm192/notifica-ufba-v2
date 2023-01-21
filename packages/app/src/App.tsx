import { AllProviders } from '@/components/Providers'
import Routes from '@/routes'

import React from 'react'
import * as Sentry from 'sentry-expo'
import * as SentryNative from '@sentry/react-native'

Sentry.init({
  dsn: 'https://f1c9e1659ccd415eb67af0751dc68303@o4504024240029696.ingest.sentry.io/4504024240881664',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

const App: React.FC = () => {
  return (
    <AllProviders>
      <Routes />
    </AllProviders>
  )
}

export default SentryNative.wrap(App)
