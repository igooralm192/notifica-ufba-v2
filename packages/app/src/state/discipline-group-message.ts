import { IDisciplineGroupMessage } from '@shared/entities'
import { IPageParams, IPaginatedList } from '@/types/list'
import { atom, selectorFamily } from 'recoil'
import Toast from 'react-native-toast-message'
import api from '@/api'
import { BaseError } from '@/helpers'
import { collection, doc, getDocs, orderBy, query } from '@firebase/firestore'
import { db } from '@/config/firebase'
import { DisciplineGroupMessageMapper } from '@/mappers'

export const disciplineGroupMessagesState = atom<
  IPaginatedList<IDisciplineGroupMessage>
>({
  key: 'DisciplineGroupMessagesState',
})

export const disciplineGroupMessagesFilterState = atom<IPageParams>({
  key: 'DisciplineGroupMessagesFilterState',
  default: { page: 0, limit: 10 },
})

export type IGetDisciplineGroupMessagesQueryArgs = {
  disciplineGroupId?: string
  filterParams: IPageParams
}

export const getDisciplineGroupMessagesQuery = selectorFamily<
  IPaginatedList<IDisciplineGroupMessage>,
  IGetDisciplineGroupMessagesQueryArgs
>({
  key: 'GetDisciplineGroupMessagesQuery',
  get:
    ({ disciplineGroupId, filterParams: { page, limit } }) =>
    async () => {
      if (!disciplineGroupId) return { results: [], total: 0 }

      try {
        const disciplineGroupMessages =
          await api.disciplineGroup.getDisciplineGroupMessages(
            disciplineGroupId,
            {
              page,
              limit,
            },
          )

        return disciplineGroupMessages
      } catch (err) {
        const error = err as BaseError

        Toast.show({
          type: 'error',
          text1: 'Erro ao retornar mensagens da turma.',
          text2: error.message,
        })

        return { results: [], total: 0 }
      }
    },
})
