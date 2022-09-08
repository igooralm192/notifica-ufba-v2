import { IDisciplineGroupPost } from '@shared/entities'
import { IPageParams, IPaginatedList } from '@/types/list'
import { atom, selectorFamily } from 'recoil'
import Toast from 'react-native-toast-message'
import api from '@/api'
import { BaseError } from '@/helpers'

export const disciplineGroupPostsState = atom<
  IPaginatedList<IDisciplineGroupPost>
>({
  key: 'DisciplineGroupPostsState',
})

export const disciplineGroupPostsFilterState = atom<IPageParams>({
  key: 'DisciplineGroupPostsFilterState',
  default: { page: 0, limit: 10 },
})

export type IGetDisciplineGroupPostsQueryArgs = {
  disciplineGroupId?: string
  filterParams: IPageParams
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
