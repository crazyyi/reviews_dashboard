import { configureStore } from '@reduxjs/toolkit'
import signInReducer from './signInSlice'
import planReducer from './planSlice'
import profileReducer from './profileSlice'

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    dashboard: planReducer,
    profile: profileReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch