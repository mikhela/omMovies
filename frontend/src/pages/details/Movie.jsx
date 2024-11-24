import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../../Context/MovieContext';
import useFetch from '../../components/useFetch';
import axios from 'axios';
import './detailsStyle.css';

export default function Movie() {
  const { id } = useParams();
  const { movies, loading, error } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);

  // Fetching trailer using useFetch
  const { data: trailerData, loading: loadingTrailer, error: trailerError } = useFetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=cd6592beb58e675d2cb6fdf038c87822`);

  // Check if the movie exists in the context, otherwise fetch the movie by ID from API
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=cd6592beb58e675d2cb6fdf038c87822`);
        setMovie(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Movie not found (404). URL:', `https://api.themoviedb.org/3/movie/${id}`);
        } else {
          console.error('Error fetching movie:', error);
        }
      }
    };
  
    fetchMovie();
  }, [id]);

  if (loading || !movie) return <h1>Loading movie details...</h1>;
  if (error) return <h1>{error.message}</h1>;

  const trailer = trailerData?.find((video) => video.type === 'Trailer');

  return (
    <div className="MoviesDetails">
      <div 
        className="movieBanner" 
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
      </div>
      <div className="information__Container">
        <div className="content_left">
          {loadingTrailer ? (
            <p>Loading trailer...</p>
          ) : trailerError ? (
            <p>{trailerError.message}</p>
          ) : trailer ? (
            <div className="trailer">
              <h3>Trailer:</h3>
              <iframe
                title="Movie Trailer"
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>No trailer available</p>
          )}
        </div>
        <div className="content_right">
          <h2 id="title">{movie.title}</h2>
          <p id="overview" className='h-[200px] overflow-y-auto noscrollbar'>Overview: {movie.overview}</p>
          <div className="content_right_mininfo">
            <p id="date">Release date: {movie.release_date}</p>
            <p id="vote"><span id="imdb"> IMDb</span><span id="voteAv">{movie.vote_average}</span></p>
            <p id="popularity">Popularity: {movie.popularity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
