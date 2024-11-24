import React, { useContext, useEffect, useState } from 'react';
import { TvShowContext } from '../Context/TvShowContext'; 
import useFetch from './useFetch';
import TvShowCard from './card/TvShowCard'; 
export default function TvShowsSection({ searchTerm }) {
  const { tvShows, loading, error, fetchMoreTvShows } = useContext(TvShowContext); 
  const [filteredTvShows, setFilteredTvShows] = useState([]);

  const { data: searchResults, loading: searchLoading, error: searchError } = useFetch(
    searchTerm && searchTerm.trim()
      ? `https://api.themoviedb.org/3/search/tv?api_key=cd6592beb58e675d2cb6fdf038c87822&query=${searchTerm}`
      : null
  );

  useEffect(() => {
    if (searchTerm && searchTerm.trim()) {
      if (searchResults) {
        setFilteredTvShows(searchResults); 
      }
    } else {
      setFilteredTvShows(tvShows);
    }
  }, [searchResults, tvShows, searchTerm]); 

  const handleLoadMore = () => {
    fetchMoreTvShows(); 
  };

  const isValidTvShow = (show) => {
    return show && show.id && show.name && show.poster_path;
  };

  if (loading || searchLoading) return <h1>Loading TV shows...</h1>;
  if (error || searchError) return <h1>Error fetching TV shows: {(error || searchError).message}</h1>;

  return (
    <div className="noscrollbar w-100 h-[80vh] lg:h-[85vh]  overflow-y-auto ">
  <div className="w-100 flex flex-wrap gap-8  justify-center mt-4">
        {filteredTvShows.length ? (
          filteredTvShows
            .filter(isValidTvShow)
            .map((show, index) => (
              <TvShowCard key={`${show.id}-${index}`} show={show} /> 
            ))
        ) : (
          <p>No TV shows found for "{searchTerm}"</p>
        )}
      </div>
      {!searchTerm && ( 
        <div
          className="load-more text-xl mx-auto md:mx-0 text-orange-600 border-[1px] border-orange-600 bg-black rounded-xl w-40 text-center py-1 mt-12 cursor-pointer hover:bg-orange-600 hover:text-black transition-all duration-200"
          onClick={handleLoadMore}
        >
          Load more
        </div>
      )}
    </div>
  );
}
