import { ILastMessageDTO } from '@notifica-ufba/domain/usecases'
import { IPaginatedList } from '@/types/list'
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit'

import { IAppStore } from '../types'
import { ILastMessagesStore } from './types'

const lastMessagesAdapter = createEntityAdapter<ILastMessageDTO>({
  selectId: data => data.disciplineGroupCode,
})

const initialState: ILastMessagesStore = {
  data: lastMessagesAdapter.getInitialState(),
  total: 0,
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    lastMessagesAdded(
      state,
      action: PayloadAction<IPaginatedList<ILastMessageDTO>>,
    ) {
      lastMessagesAdapter.addMany(state.data, action.payload.results)
      state.total = action.payload.total
    },
    cleanLastMessages(state) {
      lastMessagesAdapter.removeAll(state.data)
    },
  },
})

export const { selectAll: selectAllLastMessages } =
  lastMessagesAdapter.getSelectors<IAppStore>(state => state.lastMessages.data)

export const { lastMessagesAdded, cleanLastMessages } = messagesSlice.actions

export default messagesSlice.reducer
