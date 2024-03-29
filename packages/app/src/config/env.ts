// import { API_URL } from '@env'
import Constants from 'expo-constants'


const API_URL =
  // @ts-ignore
  (process.env.API_URL as string) ||
  Constants?.manifest2?.extra?.expoClient?.extra?.API_URL ||
  'http://10.0.2.2:3333/api'

  // @ts-ignore
console.log('EXPO_GO', process.env.EXPO_GO)

export default {
  API_URL,
  // @ts-ignore
  EXPO_GO: Boolean(process.env.EXPO_GO) || false,
}
