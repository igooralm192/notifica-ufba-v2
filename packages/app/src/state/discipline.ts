import { IDiscipline } from '@shared/entities'
import api from '@/api'
import { IPageParams, IPaginatedList } from '@/types/list'
import { atom, selectorFamily } from 'recoil'
import { BaseError } from '@/helpers'
import Toast from 'react-native-toast-message'

export const disciplinesState = atom<IPaginatedList<IDiscipline>>({
  key: 'DisciplinesState',
})

export const disciplinesFilterState = atom<IPageParams>({
  key: 'DisciplinesFilterState',
  default: { page: 0, limit: 10 },
})

export const getAllDisciplinesQuery = selectorFamily<
  IPaginatedList<IDiscipline>,
  IPageParams
>({
  key: 'GetAllDisciplinesQuery',
  get:
    ({ page, limit }) =>
    async () => {
      try {
        const disciplines = await api.discipline.getDisciplines({
          page,
          limit,
        })

        return disciplines
      } catch (err) {
        const error = err as BaseError

        Toast.show({
          type: 'error',
          text1: 'Erro ao retornar disciplinas.',
          text2: error.message,
        })

        return { results: [], total: 0 }
      }
    },
})
