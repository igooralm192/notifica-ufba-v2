// import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import { combineReducers } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'

import { authReducer } from './auth'
import { disciplineGroupsReducer } from './disciplineGroups'
import { disciplinesReducer } from './disciplines'
import { lastMessagesReducer } from './lastMessages'
import { IAppStore } from './types'

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// }

export const listenerMiddleware = createListenerMiddleware<IAppStore>()

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    disciplineGroups: disciplineGroupsReducer,
    disciplines: disciplinesReducer,
    lastMessages: lastMessagesReducer,
  }),
  middleware: [listenerMiddleware.middleware],
})

// export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<IAppStore> = useReduxSelector

export default store
