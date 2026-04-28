import Button from "@/components/commons/Button";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";

interface Props {
  movies: MoviesProps[];
  onNext: () => void;
  onPrev: () => void;
}

const MovieGrid: React.FC<Props> = ({ movies, onNext, onPrev }) => (
  <>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.titleText.text}
          posterImage={movie.primaryImage?.url ?? null}
          releaseYear={movie.releaseYear.year}
        />
      ))}
    </div>

    {movies.length === 0 && (
      <p className="text-center text-gray-400 mt-20 text-xl">
        No movies found. Try a different filter.
      </p>
    )}

    <div className="flex justify-end space-x-4 mt-6">
      <Button title="Previous" action={onPrev} />
      <Button title="Next" action={onNext} />
    </div>
  </>
);

export default MovieGrid;