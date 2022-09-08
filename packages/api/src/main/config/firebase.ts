import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app'

import serviceAccount from '../../../firebase-service-account.json'

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
})
