import { useEffect } from "react";
import { useFavorites } from "../CustomHooks/useFavorites";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../store/slices/getFavoriteSlice";
import { AppDispatch, RootState } from "../store/store";
import { Col, Row } from "antd";
import MovieCard from "../components/GenreMovieCarousel/MovieCard/MovieCard";
import { useNavigate } from "react-router";
import LoadingPage from "../components/Loading/Loading";

function Favorites() {
    const {favorites, addFavorite, removeFavorite, isFavorite} = useFavorites();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {favMovies, loading} = useSelector((state:RootState)=>state.favMovies);

    useEffect(()=>{
        dispatch(getFavorites(favorites))
    },[favorites])

    const handleBookmarkClick = (e: React.MouseEvent, imdbID:string) =>{
        e.stopPropagation();
        if(isFavorite(imdbID))
            removeFavorite(imdbID);
        else
          addFavorite({imdbID:imdbID});
      }

    return (
        <div style={{ padding: 20 }}>
        <Row gutter={[16, 16]}>
            {loading? <LoadingPage/> :favMovies.map((movie) => (
            <Col key={movie.imdbID} xs={24} sm={12} md={4} lg={4} style={{ display: 'flex', justifyContent: 'center' }}>
                <MovieCard movie={movie}  onClick={()=>navigate(`/movies/${movie.imdbID}`)} bookmarked={isFavorite(movie.imdbID)} handleBookmarkClick={handleBookmarkClick}/>
            </Col>
            ))}
        </Row>
        </div>
    );
}

export default Favorites;