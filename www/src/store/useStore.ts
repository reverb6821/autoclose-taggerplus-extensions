import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
// @ts-ignore
import type { RootState, AppDispatch } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
