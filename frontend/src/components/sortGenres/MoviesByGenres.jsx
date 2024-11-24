import "./genres.css"
import useFetch from '../useFetch.jsx';
import Cards from "../Cards.jsx";

const MoviesByGenres = () => {
  const genres = [
    { id: 10749, name: "Romance" },
    { id: 35, name: "Comedy" },
    { id: 14, name: "Fantasy" },
    { id: 18, name: "Drama" },
    { id: 53, name: "Thriller" },
    { id: 27, name: "Horror" },
    { id: 16, name: "Animation" },
    { id: 12, name: "Adventure" }
  ];

  const RenderMovies = ({ genre }) => {
    const { data, isLoading, error } = useFetch(`https://api.themoviedb.org/3/discover/movie?api_key=cd6592beb58e675d2cb6fdf038c87822&with_genres=${genre.id}`);
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div key={genre.id}>
        <div className='GenreMCOntainer'>
          <h2 className='Genrename'>{genre.name}</h2>
          <div className="genrescont">
            {data.map(movie => (
              <Cards key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {genres.map(genre => <RenderMovies key={genre.id} genre={genre} />)}
    </div>
  );
};

export default MoviesByGenres;
