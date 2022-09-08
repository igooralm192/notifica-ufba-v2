import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState, IAuthStore } from './types'

const initialState: IAuthStore = {
  state: AuthState.UNKNOWN,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    stateChanged(state, action: PayloadAction<AuthState>) {
      state.state = action.payload
    },
    tokenFetched(state, action: PayloadAction<string | null>) {
      state.token = action.payload
    },
    cleanAuth(state) {
      state.token = null
    },
  },
})

export const { stateChanged, tokenFetched, cleanAuth } = authSlice.actions

export default authSlice.reducer
