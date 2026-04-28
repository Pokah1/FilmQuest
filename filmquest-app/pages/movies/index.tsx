import Loading from "@/components/commons/Loading";
import MovieFilters from "@/components/movies/MovieFilters";
import MovieGrid from "@/components/movies/MovieGrid";
import { useMovies } from "@/hooks/useMovies";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const Movies: React.FC = () => {
  const {
    movies,
    loading,
    error,
    year,
    genre,
    setYear,
    setGenre,
    goToNextPage,
    goToPrevPage,
  } = useMovies();

  const mappedMovies = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterImage: movie.poster_path
      ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
      : null,
    releaseYear: movie.release_date?.slice(0, 4) ?? "N/A",
  }));

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <MovieFilters
        year={year}
        genre={genre}
        onYearChange={setYear}
        onGenreChange={setGenre}
      />

      {/* Show error clearly on screen instead of crashing */}
      {error && (
        <div className="bg-red-900 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-6">
          <p className="font-bold">Error: {error}</p>
          <p className="text-sm mt-1 text-red-300">Check your browser console for more details.</p>
        </div>
      )}

      <MovieGrid
        movies={mappedMovies}
        onNext={goToNextPage}
        onPrev={goToPrevPage}
      />
      {loading && <Loading />}
    </div>
  );
};

export default Movies;