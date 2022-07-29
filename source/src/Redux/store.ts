import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./reducers/pizzaReducer";
// ...

export const store = configureStore({
  reducer: {
    pizzaReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
