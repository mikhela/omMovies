// TvShowContext.js
import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../components/useFetch';
export const TvShowContext = createContext(null);

const TvShowContextProvider = (props) => {
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const { data: fetchedTvShows, loading, error } = useFetch(`https://api.themoviedb.org/3/discover/tv?api_key=cd6592beb58e675d2cb6fdf038c87822&page=${page}`);

  useEffect(() => {
    if (fetchedTvShows) {
      const existingIds = new Set(tvShows.map(show => show.id));

      const newTvShows = fetchedTvShows.filter(show => !existingIds.has(show.id));

      setTvShows((prevShows) => [...prevShows, ...newTvShows]);
    }
  }, [fetchedTvShows]);

  const fetchMoreTvShows = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const contextValue = { tvShows, loading, error, fetchMoreTvShows };

  return (
    <TvShowContext.Provider value={contextValue}>
      {props.children}
    </TvShowContext.Provider>
  );
};

export default TvShowContextProvider;
