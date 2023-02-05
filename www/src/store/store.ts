import { configureStore } from '@reduxjs/toolkit'
import tasksReducer, { tasksMiddleware } from './slices/task.slices'
import modalReducer from './slices/modal.slices'
import menuReducer from './slices/menu.slices'

const store = configureStore({
  reducer: { tasks: tasksReducer, modal: modalReducer, menu: menuReducer },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(tasksMiddleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store
