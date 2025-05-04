import GenreMovieCarousel from '../components/GenreMovieCarousel/GenreMovieCarousel'
import { AppDispatch, RootState } from '../store/store';
import { useEffect, useRef } from 'react';
import { fetchMultipleMovies } from '../store/Dispatcher/MutlipleDispatch';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { movies, loading, error } = useSelector((state: RootState) => state.movies);
    //preventing double dispatch in dev mode
    const fetchedRef = useRef(false);
        
    useEffect(() => {
        if (fetchedRef.current) return;  // prevent second run
        fetchedRef.current = true;
            fetchMultipleMovies(['comedy', 'war', 'action'], 1, dispatch)
        }, []);
    return (
        <>
        {(!loading && !error) && <>
        <GenreMovieCarousel movies={movies.comedy} category='Top Movies'/>
        <GenreMovieCarousel movies={movies.war} category='War Movies'/> 
        <GenreMovieCarousel movies={movies.action} category='Action Movies'/> 
        </>}
        </>
    );
}

export default Home;