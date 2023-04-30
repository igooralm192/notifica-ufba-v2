import {
  IGeneratePostEndpoint,
  IGenerateMessageEndpoint,
} from '@/api/experiment/types'
import { api } from '@/services/api'

export function generatePost(params: IGeneratePostEndpoint.Params) {
  return api.post(`/experiment/post/${params.disciplineGroupId}`)
}

export function generateMessage(params: IGenerateMessageEndpoint.Params) {
  return api.post(`/experiment/message/${params.disciplineGroupId}`)
}
