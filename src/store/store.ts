import { configureStore } from '@reduxjs/toolkit'
import cueLayoutsReducer from './cueLayoutsSlice'

const store = configureStore({
  reducer: {
    cueLayouts: cueLayoutsReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch