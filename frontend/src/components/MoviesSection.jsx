import React, { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../Context/MovieContext';
import useFetch from './useFetch';
import MovieCard from './card/MovieCard';
export default function MoviesSection({ searchTerm }) {
  const { movies, loading, error, fetchMoreMovies } = useContext(MovieContext); 
  const [filteredMovies, setFilteredMovies] = useState([]);


  const { data: searchResults, loading: searchLoading, error: searchError } = useFetch(
    searchTerm && searchTerm.trim()
      ? `https://api.themoviedb.org/3/search/movie?api_key=cd6592beb58e675d2cb6fdf038c87822&query=${searchTerm}`
      : null
  );
  
  useEffect(() => {
    if (searchTerm && searchTerm.trim()) {
      if (searchResults) {
        setFilteredMovies(searchResults);
      }
    } else {
      setFilteredMovies(movies);
    }
  }, [searchResults, movies, searchTerm]); 

  const handleLoadMore = () => {
    fetchMoreMovies(); 
  };
  const isValidMovie = (movie) => {
    return movie && movie.id && movie.title && movie.poster_path;
  };

  if (loading || searchLoading) return <h1>Loading movies...</h1>;
  if (error || searchError) return <h1>Error fetching movies: {(error || searchError).message}</h1>;

  return (
    <div className="noscrollbar w-100 h-[80vh] lg:h-[85vh]   overflow-y-auto ">
      <div className="w-100 flex flex-wrap gap-8  justify-center mt-4">
        {filteredMovies.length ? (
          filteredMovies
            .filter(isValidMovie)
            .map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))
        ) : (
          <p>No movies found for "{searchTerm}"</p>
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
