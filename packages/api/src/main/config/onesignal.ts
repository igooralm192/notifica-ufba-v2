import env from '@/main/config/env'

// import * as OneSignal from '@onesignal/node-onesignal'

const appKeyProvider = {
  getToken() {
    return env.ONESIGNAL_APP_KEY
  },
}

const userKeyProvider = {
  getToken() {
    return env.ONESIGNAL_USER_KEY
  },
}

// const configuration = OneSignal.createConfiguration({
//   authMethods: {
//     app_key: { tokenProvider: appKeyProvider },
//     user_key: { tokenProvider: userKeyProvider },
//   },
// })

// const onesignalApi = new OneSignal.DefaultApi(configuration)

// export { onesignalApi }
