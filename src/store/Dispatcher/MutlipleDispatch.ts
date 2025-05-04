import { AppDispatch } from "../store";
import { fetchMoviesByName, setLoading } from "../slices/apiSlice";

export const fetchMultipleMovies = async (names: string[], page: number, dispatch:AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await Promise.all(
      names.map((name) => dispatch(fetchMoviesByName({ name, page })))
    );
    dispatch(setLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
  }
};
