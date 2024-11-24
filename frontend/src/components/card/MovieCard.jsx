import React from 'react';
import { Link } from 'react-router-dom';
import './cardStyle.css';

export default function MovieCard({ movie }) {
  return (
    <div className="header-card mx-auto sm:mx-0">
      <div className="header-card-item">
          <Link to={`/movies/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          </Link>
        <div className="details">
          <h2>{movie.title}</h2>
          <p>Rating: {movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
}
