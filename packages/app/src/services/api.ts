import axios from 'axios'

import env from '@/config/env'

export const api = axios.create({
  baseURL: env.API_URL ?? 'http://10.0.2.2:3333/api',
  timeout: 10000,
})
