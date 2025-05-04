import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/apiSlice'; 
import movieDetailReducer from './slices/apiSliceById'
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
