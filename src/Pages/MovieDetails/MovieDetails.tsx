import { Typography, Tag, List, Space, Image, Row, Col } from 'antd';
import './MovieDetails.css';
import { MovieDetails as movie } from '../../types/types';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesByID } from '../../store/slices/apiSliceById';
import { AppDispatch, RootState } from '../../store/store';

const { Title, Paragraph, Text } = Typography;


interface MovieDetailsProps {
  movie?: movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { moviesDetails: movie, loading, error } = useSelector((state: RootState) => state.movieDetails);

  useEffect(()=>{
    if(id){
      dispatch(fetchMoviesByID(id))
    }
  },[])

  return (
    <>
    {(!loading && !error && movie) && <div className="movie-details-page">
      <Row gutter={[32, 32]} align="middle">
        {/* Poster */}
        <Col xs={24} md={8}>
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width="100%"
            style={{ borderRadius: 16 }}
            preview={false}
          />
        </Col>

        {/* Info */}
        <Col xs={24} md={16}>
          <Title level={1} style={{ color: '#fff' }}>
            {movie.Title} ({movie.Year})
          </Title>

          <Space wrap>
            <Tag color="cyan">{movie.Genre}</Tag>
            <Tag color="magenta">{movie.Runtime}</Tag>
            <Tag color="purple">{movie.Rated}</Tag>
          </Space>

          <Space wrap style={{ margin: '1rem 0' }}>
            {movie.Ratings.map((rating) => (
              <Tag color="geekblue" key={rating.Source}>
                {rating.Source}: {rating.Value}
              </Tag>
            ))}
          </Space>

          <Paragraph style={{ color: '#ddd' }}>{movie.Plot}</Paragraph>

          <List
            size="small"
            dataSource={[
              { label: 'Director', value: movie.Director },
              { label: 'Writer', value: movie.Writer },
              { label: 'Actors', value: movie.Actors },
              { label: 'Language', value: movie.Language },
              { label: 'Awards', value: movie.Awards },
              { label: 'Box Office', value: movie.BoxOffice },
            ]}
            renderItem={(item) => (
              <List.Item style={{ border: 'none', padding: '4px 0' }}>
                <Text strong style={{ color: '#aaa' }}>{item.label}:</Text>{' '}
                <Text style={{ color: '#fff', marginLeft: 8 }}>{item.value}</Text>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>}
    </>
  );
};


export default MovieDetails;
