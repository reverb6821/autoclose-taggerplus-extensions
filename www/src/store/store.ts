import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: { },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat()
})

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store
