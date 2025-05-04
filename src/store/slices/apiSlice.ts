import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import movieApi from "../../services/api"
import { Movie } from '../../types/types';

interface MoviesState {
  movies: Record<string, Movie[]>;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: {},
  loading: false,
  error: null,
};

export const fetchMoviesByName = createAsyncThunk<
  { name: string; movies: Movie[] }, 
  { name: string; page: number }, 
  { rejectValue: string }
>(
  'movies/fetchMoviesByName',
  async ({ name, page }, { rejectWithValue }) => {
    try {
      const res = await movieApi.fetchbyName(name, page);

      if (res.Response === 'False') {
        return rejectWithValue(res.Error || 'Failed to fetch');
      }

      return { name, movies: res.Search };
    } catch (err) {
      return rejectWithValue('Network error');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByName.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchMoviesByName.fulfilled, (state, action: PayloadAction<{ name: string; movies: Movie[] }>) => {
        const { name, movies } = action.payload;
        if (state.movies[name]) {
          state.movies[name] = [...state.movies[name], ...movies];
        } else {
          state.movies[name] = movies;
        }
      })
      .addCase(fetchMoviesByName.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      });
  },
});
export const { setLoading } = moviesSlice.actions
export default moviesSlice.reducer;
