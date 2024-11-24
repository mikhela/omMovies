import React from 'react';
import { Link } from 'react-router-dom';
import './cardStyle.css';

export default function TvShowCard({ show }) {
  return (
    <div className="header-card mx-auto sm:mx-0">
      <div className="header-card-item">
        <Link to={`/tvshows/${show.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            alt={show.name}
          />
        </Link>
        <div className="details">
          <h2>{show.name}</h2>
          <p>Rating: {show.vote_average}</p>
        </div>
      </div>
    </div>
  );
}
