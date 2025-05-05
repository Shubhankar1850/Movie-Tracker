import { Movie } from "../../../types/types";
import "./MovieCard.css";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

type Iprops = {
  movie: Movie;
  onClick: Function;
  handleBookmarkClick: Function;
  bookmarked: boolean;
};

function MovieCard({ movie, onClick, handleBookmarkClick, bookmarked }: Iprops) {

  return (
    <div className="movie-card" id={movie.imdbID} onClick={() => onClick(movie.imdbID)}>
      <img className="movie-card-image" src={movie.Poster} alt={movie.Title} />
      <div className="bookmark-icon" onClick={(e)=>handleBookmarkClick(e,movie.imdbID)}>
        {bookmarked ? (
          <FaBookmark color="#ffffff" size={20} /> 
        ) : (
          <FaRegBookmark color="#ffda00" size={20} />
        )}
      </div>

      <div className="new-movie-badge">NEW MOVIE</div>
      <div className="movie-title">{movie.Title}</div>
      <div className="movie-subtitle">{movie.Year}</div>
    </div>
  );
}

export default MovieCard;
