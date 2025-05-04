import { Movie } from "../../../types/types";
import "./MovieCard.css"

type Iprops ={
    movie : Movie,
    onClick : Function
}

function MovieCard({movie, onClick}:Iprops) {
    return (
        <div className="movie-card" id ={movie.imdbID} onClick={()=> onClick(movie.imdbID)}>
          <img className="movie-card-image" src={movie.Poster} alt="Superboys Malegaon"/>
          <div className="new-movie-badge">NEW MOVIE</div>
          <div className="movie-title">{movie.Title}</div>
          <div className="movie-subtitle">{movie.Year}</div>
      </div>
    );
}

export default MovieCard;