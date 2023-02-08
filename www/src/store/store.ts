import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { doneSlice } from './slices/done'
import { inProgressSlice } from './slices/inProgress'
import { todoSlice } from './slices/todo'

export const store = configureStore({
  reducer: combineReducers({
    done: doneSlice.reducer,
    inProgress: inProgressSlice.reducer,
    todo: todoSlice.reducer
  })
})

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
