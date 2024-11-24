import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TvShowContext } from '../../Context/TvShowContext';
import axios from 'axios';
import './detailsStyle.css';

export default function TvShow() {
  const { id } = useParams();
  const { loading, error } = useContext(TvShowContext);
  const [tvShow, setTvShow] = useState(null);

  // Fetching TV show details
  useEffect(() => {
    const fetchTvShow = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=cd6592beb58e675d2cb6fdf038c87822`);
        setTvShow(response.data);
      } catch (error) {
        console.error('Error fetching TV show:', error);
      }
    };

    fetchTvShow();
  }, [id]);

  if (loading || !tvShow) return <h1>Loading TV show details...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <div className="TvShowDetails">
        <div 
          className="movieBanner" 
          style={{ 
            backgroundImage: `${tvShow.backdrop_path ? `url(https://image.tmdb.org/t/p/original/${tvShow.backdrop_path})` : `url(https://image.tmdb.org/t/p/w500/${tvShow.poster_path})`}` 
          }}
        >
        </div>
        <div className="information__Container">
          <div 
            className="content_left" 
            style={{ 
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${tvShow.poster_path})` 
            }}
          >
          </div>
          <div className="content_right">
            <h2 id="title">{tvShow.name}</h2>
            <p id="overview" className='max-h-[250px] overflow-y-auto noscrollbar'>Overview: {tvShow.overview}</p>
            <div className="content_right_mininfo">
              <p id="date">First air date: {tvShow.first_air_date}</p>
              <p id="vote">
                <span id="imdb">IMDb</span>
                <span id="voteAv">{tvShow.vote_average}</span>
              </p>
              <p id="popularity">Popularity: {tvShow.popularity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
