import { IDiscipline } from '@shared/entities'
import { EntityState } from '@reduxjs/toolkit'

export interface IDisciplinesStore {
  data: EntityState<IDiscipline>
  total: number
}
