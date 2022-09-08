import { IDisciplineGroup } from '@shared/entities'
import { IPageParams, IPaginatedList } from '@/types/list'
import { atom, noWait, selectorFamily } from 'recoil'
import Toast from 'react-native-toast-message'
import api from '@/api'
import { BaseError } from '@/helpers'

export const disciplineGroupsState = atom<IPaginatedList<IDisciplineGroup>>({
  key: 'DisciplineGroupsState',
})

export const disciplineGroupsFilterState = atom<IPageParams>({
  key: 'DisciplineGroupsFilterState',
  default: { page: 0, limit: 10 },
})

export type IGetMyDisciplineGroupsQueryArgs = {
  studentId?: string
  filterParams: IPageParams
}

export const getMyDisciplineGroupsQuery = selectorFamily<
  IPaginatedList<IDisciplineGroup>,
  IGetMyDisciplineGroupsQueryArgs
>({
  key: 'GetMyDisciplineGroupsQuery',
  get:
    ({ studentId, filterParams: { page, limit } }) =>
    async () => {
      if (!studentId) return { results: [], total: 0 }

      try {
        const disciplineGroups = await api.disciplineGroup.getDisciplineGroups({
          query: { studentId },
          page,
          limit,
        })

        return disciplineGroups
      } catch (err) {
        const error = err as BaseError

        Toast.show({
          type: 'error',
          text1: 'Erro ao retornar turmas.',
          text2: error.message,
        })

        return { results: [], total: 0 }
      }
    },
})

export const getDisciplineGroupQuery = selectorFamily<
  IDisciplineGroup | null,
  string
>({
  key: 'GetDisciplineGroupQuery',
  get: (disciplineGroupId: string) => async () => {
    try {
      const { disciplineGroup } = await api.disciplineGroup.getDisciplineGroup(
        disciplineGroupId,
      )

      return disciplineGroup
    } catch (err) {
      const error = err as BaseError

      Toast.show({
        type: 'error',
        text1: 'Erro ao retornar turma.',
        text2: error.message,
      })

      return null
    }
  },
})

export type ISubscribeStudentQueryArgs = {
  disciplineGroupId: string
}

export const subscribeStudentQuery = selectorFamily<
  void,
  ISubscribeStudentQueryArgs
>({
  key: 'SubscribeStudentQuery',
  get:
    ({ disciplineGroupId }) =>
    async () => {
      await api.disciplineGroup.subscribeStudent({ disciplineGroupId })
    },
})
