// import { API_URL } from '@env'
import Constants from 'expo-constants'

const API_URL =
  Constants?.manifest2?.extra?.expoClient?.extra?.API_URL ||
  'http://10.0.2.2:3333/api'

export default {
  API_URL,
}
