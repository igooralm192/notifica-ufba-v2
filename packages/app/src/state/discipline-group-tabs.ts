import { IDisciplineGroupMessage, IDisciplineGroupPost } from '@shared/entities'
import { IPageParams, IPaginatedList } from '@/types/list'
import { atom, selectorFamily, waitForAll } from 'recoil'
import Toast from 'react-native-toast-message'
import api from '@/api'
import { BaseError } from '@/helpers'
import {
  disciplineGroupPostsFilterState,
  getDisciplineGroupPostsQuery,
} from '@/state/discipline-group-post'
import { disciplineGroupMessagesFilterState, getDisciplineGroupMessagesQuery } from '@/state/discipline-group-message'

export interface IGetDisciplineGroupTabsQueryResult {
  posts: IPaginatedList<IDisciplineGroupPost>
  messages: IPaginatedList<IDisciplineGroupMessage>
}

export const getDisciplineGroupTabsQuery = selectorFamily<
  IGetDisciplineGroupTabsQueryResult,
  string
>({
  key: 'GetDisciplineGroupTabsQuery',
  get:
    (disciplineGroupId: string) =>
    ({ get }) => {
      return get(
        waitForAll({
          posts: getDisciplineGroupPostsQuery({
            disciplineGroupId,
            filterParams: get(disciplineGroupPostsFilterState),
          }),
          messages: getDisciplineGroupMessagesQuery({
            disciplineGroupId,
            filterParams: get(disciplineGroupMessagesFilterState),
          }),
        }),
      )
    },
})
