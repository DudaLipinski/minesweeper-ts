import { reducer } from './modules/GameWithRedux/game'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    game: reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
