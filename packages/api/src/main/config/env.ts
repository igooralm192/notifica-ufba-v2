export interface Env {
  NODE_ENV: 'development' | 'production'
  PORT: number
  DATABASE_URL: string
  SENDGRID_API_KEY: string
  ONESIGNAL_APP_ID: string
  ONESIGNAL_APP_KEY: string
  ONESIGNAL_USER_KEY: string
  SMTP_HOST: string
  SMTP_PORT: number
  SMTP_AUTH_USER: string
  SMTP_AUTH_PASSWORD: string
  API_REDIRECT_URL: string
  APP_DEFAULT_FORGOT_PASSWORD_URL: string
  APP_EXPO_FORGOT_PASSWORD_URL: string
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 3333),
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/test',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
  ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID || '',
  ONESIGNAL_APP_KEY: process.env.ONESIGNAL_APP_KEY || '',
  ONESIGNAL_USER_KEY: process.env.ONESIGNAL_USER_KEY || '',
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: Number(process.env.SMTP_PORT || 465),
  SMTP_AUTH_USER: process.env.SMTP_AUTH_USER || '',
  SMTP_AUTH_PASSWORD: process.env.SMTP_AUTH_PASSWORD || '',
  API_REDIRECT_URL: process.env.API_REDIRECT_URL || '',
  APP_DEFAULT_FORGOT_PASSWORD_URL:
    process.env.APP_DEFAULT_FORGOT_PASSWORD_URL || '',
  APP_EXPO_FORGOT_PASSWORD_URL: process.env.APP_EXPO_FORGOT_PASSWORD_URL || '',
} as Env
