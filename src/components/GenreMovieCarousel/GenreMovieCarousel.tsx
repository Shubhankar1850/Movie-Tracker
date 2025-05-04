import { Button, Flex } from "antd";
import "./GenreMovieCarousel.css"
import MovieCard from "./MovieCard/MovieCard";
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { Movie } from "../../types/types";

type IProps = {
  category: string;
  movies: Movie[];
};

function GenreMovieCarousel( {movies, category}: IProps) {
  const navigate = useNavigate();

  const navigateOnClick = (imdbID: string)=>{
    navigate(`/movies/${imdbID}`);
  }

  return (
    <div>
      <div className="container">
        <div className="carousel-header">
          <h2 className="carousel-title">{category}</h2>
          {/* See more functionality not implemented*/}
          <Button type="text" className="see-more-button">
            See more <RightOutlined className="see-more-icon" />
          </Button>
        </div>
        <Flex gap="middle" className="carousel">
          {movies?.length>0 && movies.map(movie=><MovieCard movie={movie} onClick={navigateOnClick}/>)}
        </Flex>
      </div>
   </div>
  );
}

export default GenreMovieCarousel;