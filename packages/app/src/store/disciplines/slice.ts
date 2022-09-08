import { IDiscipline } from '@shared/entities'
import { IPaginatedList } from '@/types/list'
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  Update,
  EntityId,
} from '@reduxjs/toolkit'

import { IAppStore } from '../types'
import { IDisciplinesStore } from './types'

const disciplinesAdapter = createEntityAdapter<IDiscipline>()

const initialState: IDisciplinesStore = {
  data: disciplinesAdapter.getInitialState(),
  total: 0,
}

const disciplinesSlice = createSlice({
  name: 'disciplines',
  initialState,
  reducers: {
    disciplineAdded(state, action: PayloadAction<IDiscipline>) {
      disciplinesAdapter.addOne(state.data, action.payload)
    },
    disciplinesAdded(
      state,
      action: PayloadAction<IPaginatedList<IDiscipline>>,
    ) {
      disciplinesAdapter.addMany(state.data, action.payload.results)
      state.total = action.payload.total
    },
    disciplineChanged(state, action: PayloadAction<Update<IDiscipline>>) {
      disciplinesAdapter.updateOne(state.data, action.payload)
    },
    disciplineRemoved(state, action: PayloadAction<EntityId>) {
      disciplinesAdapter.removeOne(state.data, action.payload)
    },
    cleanDisciplines(state) {
      disciplinesAdapter.removeAll(state.data)
    },
  },
})

export const {
  selectAll: selectAllDisciplines,
  selectById: selectDisciplineById,
} = disciplinesAdapter.getSelectors<IAppStore>(state => state.disciplines.data)

export const {
  disciplineAdded,
  disciplinesAdded,
  disciplineChanged,
  disciplineRemoved,
  cleanDisciplines,
} = disciplinesSlice.actions

export default disciplinesSlice.reducer
