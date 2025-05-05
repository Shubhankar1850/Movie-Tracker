import { AppDispatch } from "../store";
import { fetchMoviesByName, setLoading } from "../slices/apiSlice";
import { fetchMoviesByID } from "../slices/apiSliceById";

export const fetchMultipleMoviesByName = async (names: string[], page: number, dispatch:AppDispatch) => {
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

export const fetchMultipleMoviesByID = async (ids: string[], dispatch:AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await Promise.all(
      ids.map((id) => dispatch(fetchMoviesByID(id)))
    );
    dispatch(setLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
  }
};
