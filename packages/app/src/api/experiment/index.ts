import {
  IGeneratePostEndpoint,
  IGenerateMessageEndpoint,
} from '@/api/experiment/types'
import { api } from '@/services/api'

export function generatePost(request: IGeneratePostEndpoint.Request) {
  return api.post('/experiment/post')
}

export function generateMessage(request: IGenerateMessageEndpoint.Request) {
  return api.post('/experiment/message')
}
