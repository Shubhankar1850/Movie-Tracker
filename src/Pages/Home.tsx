import GenreMovieCarousel from '../components/GenreMovieCarousel/GenreMovieCarousel'
import { AppDispatch, RootState } from '../store/store';
import { useEffect, useRef } from 'react';
import { fetchMultipleMoviesByName } from '../store/Dispatcher/MutlipleDispatch';
import { useDispatch, useSelector } from 'react-redux';
import { useFavorites } from '../CustomHooks/useFavorites';
import LoadingPage from '../components/Loading/Loading';

function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { movies, loading, error} = useSelector((state: RootState) => state.movies);
    const {addFavorite, removeFavorite, isFavorite} = useFavorites();
    const handleBookmarkClick = (e: React.MouseEvent, imdbID:string) =>{
        e.stopPropagation();;
        if(isFavorite(imdbID))
          {
            removeFavorite(imdbID)
          }
        else{
          addFavorite({imdbID:imdbID})
        }
        
      }
    //preventing double dispatch in dev mode
    const fetchedRef = useRef(false);
        
    useEffect(() => {
        // prevent second run due to strict mode
        if (fetchedRef.current) return;  
        fetchedRef.current = true;
        // skip API call on remount
        if (movies.comedy?.length || movies.war?.length || movies.action?.length) {
            return;
          }
        fetchMultipleMoviesByName(['comedy', 'war', 'action'], 1, dispatch);
        }, []);
        

    return (
        <>
        { loading ? <LoadingPage/> : !error && <>
        <GenreMovieCarousel movies={movies.comedy} category='Top Movies'isFavorite={isFavorite} handleBookmarkClick={handleBookmarkClick}/>
        <GenreMovieCarousel movies={movies.war} category='War Movies'isFavorite={isFavorite} handleBookmarkClick={handleBookmarkClick}/> 
        <GenreMovieCarousel movies={movies.action} category='Action Movies'isFavorite={isFavorite} handleBookmarkClick={handleBookmarkClick}/> 
        </>}
        </>
    );
}

export default Home;