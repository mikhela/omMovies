import React, { useEffect, useState, useRef } from 'react';
import useFetch from '../useFetch';
import './carouselstyle.css';
import ClipLoader from "react-spinners/ClipLoader";

const HomeCarousel = () => {
  const { data, loading, error } = useFetch('https://api.themoviedb.org/3/discover/movie?api_key=cd6592beb58e675d2cb6fdf038c87822');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const transitionDuration = 1000;
  const autoNextDuration = 5000;

  const movies = data ? data.slice(0, 8) : [];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  useEffect(() => {
    const handleAutoSlide = () => {
      timeoutRef.current = setTimeout(goToNext, autoNextDuration);
    };

    handleAutoSlide();

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, movies.length]);

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return   <ClipLoader color={"white"} loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader" className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'/>
  return (
    <div className="carousel w-full h-[100vh] overflow-hidden relative">
      <div className="list" style={{ position: 'relative', height: '100%' }}>
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`item ${index === currentIndex ? 'active' : ''}`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              transition: `transform ${transitionDuration}ms ease`,
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            <div className="content">
              <div className="title">{movie.title}</div>
              <div className="topic">GENRE</div>
              <div className="des">{movie.overview}</div>

            </div>
          </div>
        ))}
      </div>

      <div className="thumbnail p-10">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`item ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>

      <div className="arrows">
        <button onClick={goToPrev} className="prev-btn w-[40px] h-[40px] rounded-full text-red-600 font-monos font-extrabold duration-1000 bg-black">⟨</button>
        <button onClick={goToNext} className="next-btn w-[40px] h-[40px] rounded-full text-red-600 font-monos font-extrabold duration-1000 bg-white">⟩</button>
      </div>

      <div className="time"></div>
    </div>
  );
};

export default HomeCarousel;
