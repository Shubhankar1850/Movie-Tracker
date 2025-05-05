import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import movieApi from "../../services/api"
import { FavoriteMovie, Movie } from '../../types/types';

interface MoviesState {
  favMovies: Movie[]; 
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  favMovies: [],
  loading: false,
  error: null,
};

export const getFavorites = createAsyncThunk<
  Movie[],
  FavoriteMovie[],
  { rejectValue: string }
>(
  'movies/getFavorites',
  async (ids, { rejectWithValue }) => {
    try {
      const results = await Promise.allSettled(
        ids.map(async (id) => {
          const res = await movieApi.fetchbyID(id.imdbID);

          if (res.Response === 'False') {
            throw new Error(res.Error || `Failed to fetch movie with ID: ${id}`);
          }

          return {
            imdbID: res.imdbID,
            Poster: res.Poster,
            Title: res.Title,
            Year: res.Year,
            Type: res.Type,
          } as Movie;
        })
      );

      const movies: Movie[] = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          return {
            imdbID: ids[index].imdbID,
            Poster: 'error',
            Title: 'error',
            Year: 'error',
            Type: 'error',
          };
        }
      });

      return movies;
    } catch (err) {
      return rejectWithValue('Network error');
    }
  }
);

const favoriteDetailSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.favMovies = action.payload;
        state.loading = false;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});
export default favoriteDetailSlice.reducer;
