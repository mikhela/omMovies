import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../components/useFetch';
export const MovieContext = createContext(null);

const MovieContextProvider = (props) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { data: fetchedMovies, loading, error } = useFetch(`https://api.themoviedb.org/3/discover/movie?api_key=cd6592beb58e675d2cb6fdf038c87822&page=${page}`);

  useEffect(() => {
    if (fetchedMovies) {
      const existingIds = new Set(movies.map(movie => movie.id));
      
      const newMovies = fetchedMovies.filter(movie => !existingIds.has(movie.id));

      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    }
  }, [fetchedMovies]);

  const fetchMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const contextValue = { movies, loading, error, fetchMoreMovies };

  return (
    <MovieContext.Provider value={contextValue}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
