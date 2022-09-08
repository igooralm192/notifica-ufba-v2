import { IDisciplineGroup } from '@shared/entities'
import { IPaginatedList } from '@/types/list'
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  Update,
  EntityId,
} from '@reduxjs/toolkit'

import { IAppStore } from '../types'
import { IDisciplineGroupsStore } from './types'

const disciplineGroupsAdapter = createEntityAdapter<IDisciplineGroup>()

const initialState: IDisciplineGroupsStore = {
  data: disciplineGroupsAdapter.getInitialState(),
  total: 0,
}

const disciplineGroupsSlice = createSlice({
  name: 'disciplineGroups',
  initialState,
  reducers: {
    disciplineGroupAdded(state, action: PayloadAction<IDisciplineGroup>) {
      disciplineGroupsAdapter.addOne(state.data, action.payload)
    },
    disciplineGroupsAdded(
      state,
      action: PayloadAction<IPaginatedList<IDisciplineGroup>>,
    ) {
      disciplineGroupsAdapter.addMany(state.data, action.payload.results)
      state.total = action.payload.total
    },
    disciplineGroupChanged(
      state,
      action: PayloadAction<Update<IDisciplineGroup>>,
    ) {
      disciplineGroupsAdapter.updateOne(state.data, action.payload)
    },
    disciplineGroupRemoved(state, action: PayloadAction<EntityId>) {
      disciplineGroupsAdapter.removeOne(state.data, action.payload)
    },
    cleanDisciplineGroups(state) {
      disciplineGroupsAdapter.removeAll(state.data)
    },
  },
})

export const {
  selectAll: selectAllDisciplineGroups,
  selectById: selectDisciplineGroupById,
} = disciplineGroupsAdapter.getSelectors<IAppStore>(
  state => state.disciplineGroups.data,
)

export const {
  disciplineGroupAdded,
  disciplineGroupsAdded,
  disciplineGroupChanged,
  disciplineGroupRemoved,
  cleanDisciplineGroups,
} = disciplineGroupsSlice.actions

export default disciplineGroupsSlice.reducer
