import { IDisciplineGroup } from '@shared/entities'
import { EntityState } from '@reduxjs/toolkit'

export interface IDisciplineGroupsStore {
  data: EntityState<IDisciplineGroup>
  total: number
}
