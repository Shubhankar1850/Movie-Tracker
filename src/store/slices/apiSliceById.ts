import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import movieApi from "../../services/api"
import { MovieDetails } from '../../types/types';

interface MoviesState {
  moviesDetails: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  moviesDetails: null,
  loading: false,
  error: null,
};

export const fetchMoviesByID = createAsyncThunk<MovieDetails,string,{rejectValue: string}>(
  'movies/fetchMoviesByID',
  async (id,{rejectWithValue}) => {
    try {
      const res = await movieApi.fetchbyID(id);

      if (res.Response === 'False') {
        return rejectWithValue(res.Error || 'Failed to fetch');
      }

      return { ...res };
    } catch (err) {
      return rejectWithValue('Network error');
    }
  }
);

const movieDetailSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByID.pending, (state) => {
        state.error = null;
        state.loading=true;
      })
      .addCase(fetchMoviesByID.fulfilled, (state, action: PayloadAction<MovieDetails>) => {
            state.moviesDetails = action.payload
            state.loading = false
        }
      )
      .addCase(fetchMoviesByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});
export const { setLoading } = movieDetailSlice.actions
export default movieDetailSlice.reducer;
