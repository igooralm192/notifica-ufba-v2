import { IAuthStore } from '@/store/auth/types'
import { IDisciplineGroupsStore } from '@/store/disciplineGroups/types'
import { IDisciplinesStore } from '@/store/disciplines/types'
import { ILastMessagesStore } from '@/store/lastMessages/types'

export interface IAppStore {
  auth: IAuthStore
  disciplineGroups: IDisciplineGroupsStore
  disciplines: IDisciplinesStore
  lastMessages: ILastMessagesStore
}
