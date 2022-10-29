export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 3333),
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/test',
  ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID || '',
  ONESIGNAL_APP_KEY: process.env.ONESIGNAL_APP_KEY || '',
  ONESIGNAL_USER_KEY: process.env.ONESIGNAL_USER_KEY || '',
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: Number(process.env.SMTP_PORT || 465),
  SMTP_AUTH_USER: process.env.SMTP_AUTH_USER || '',
  SMTP_AUTH_PASSWORD: process.env.SMTP_AUTH_PASSWORD || '',
  APP_FORGOT_PASSWORD_URL: process.env.APP_FORGOT_PASSWORD_URL || '',
}
