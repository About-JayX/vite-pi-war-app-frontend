import { combineReducers, configureStore } from '@reduxjs/toolkit'

import user from './user'

const rootReducer = combineReducers({
  user,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
