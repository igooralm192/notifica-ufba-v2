import { IDisciplineGroupPost } from '@shared/entities'
import { IFilterParams, IPaginatedList } from '@/types/list'
import { atom, selectorFamily } from 'recoil'
import Toast from 'react-native-toast-message'
import api from '@/api'
import { BaseError } from '@/helpers'
import {
  IHttpRequestBody,
  IHttpRequestBodyAndParams,
  IHttpRequestParams,
} from '@/types/http'
import { ICreatePostEndpoint } from '@/api/discipline-group/types'

export const disciplineGroupPostsState = atom<
  IPaginatedList<IDisciplineGroupPost>
>({
  key: 'DisciplineGroupPostsState',
})

export const disciplineGroupPostsFilterState = atom<IFilterParams>({
  key: 'DisciplineGroupPostsFilterState',
  default: { page: 0, limit: 10 },
})

export type IGetDisciplineGroupPostsQueryArgs = {
  disciplineGroupId?: string
  filterParams: IFilterParams
}

export const getDisciplineGroupPostsQuery = selectorFamily<
  IPaginatedList<IDisciplineGroupPost>,
  IGetDisciplineGroupPostsQueryArgs
>({
  key: 'GetDisciplineGroupPostsQuery',
  get:
    ({ disciplineGroupId, filterParams: { page, limit } }) =>
    async () => {
      if (!disciplineGroupId) return { results: [], total: 0 }

      try {
        const disciplineGroupPosts =
          await api.disciplineGroup.getDisciplineGroupPosts(disciplineGroupId, {
            page,
            limit,
          })

        return disciplineGroupPosts
      } catch (err) {
        const error = err as BaseError

        Toast.show({
          type: 'error',
          text1: 'Erro ao retornar postagens da turma.',
          text2: error.message,
        })

        return { results: [], total: 0 }
      }
    },
})

export const createPostMutation = selectorFamily<
  void,
  IHttpRequestBodyAndParams<
    ICreatePostEndpoint.Body,
    ICreatePostEndpoint.Params
  >
>({
  key: 'CreatePostMutation',
  get:
    ({ body: { content }, params: { disciplineGroupId } }) =>
    async () => {
      await api.disciplineGroup.createPost({ disciplineGroupId }, { content })
    },
})
