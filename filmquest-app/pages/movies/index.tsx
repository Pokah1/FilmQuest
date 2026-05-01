import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import MovieFilters from "@/components/movies/MovieFilters";
import { useMovies } from "@/hooks/useMovies";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const Movies: React.FC = () => {
  const {
    movies, loading, year, genre, search, page,
    setYear, setGenre, setSearch,
    goToNextPage, goToPrevPage,
  } = useMovies();

  const mappedMovies = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterImage: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : null,
    releaseYear: movie.release_date?.slice(0, 4) ?? "N/A",
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#0A0C10", color: "#fff", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @keyframes cardIn { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .movie-grid-item { animation: cardIn 0.45s ease both; }
        .page-btn:hover:not(:disabled) { background: #E2D609 !important; color: #000 !important; border-color: #E2D609 !important; }
        .page-btn:disabled { opacity: 0.25 !important; cursor: not-allowed !important; }
      `}</style>

      {/* Atmospheric bg */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "40%", background: "radial-gradient(ellipse at top, rgba(226,214,9,0.04) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "0 40px 80px" }}>

        <MovieFilters
          year={year}
          genre={genre}
          search={search}
          onYearChange={setYear}
          onGenreChange={setGenre}
          onSearchChange={setSearch}
        />

        {/* Results count */}
        {!loading && mappedMovies.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: 28, animation: "fadeUp 0.4s ease both" }}>
            <p style={{ margin: 0, fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
              {mappedMovies.length} titles · Page {page}
            </p>
            <div style={{ height: 1, flex: 1, marginLeft: 20, background: "linear-gradient(to right, rgba(255,255,255,0.06), transparent)" }} />
          </div>
        )}

        {/* Empty state */}
        {!loading && mappedMovies.length === 0 && (
          <div style={{ textAlign: "center", padding: "100px 0", animation: "fadeUp 0.5s ease both" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: 48, color: "rgba(255,255,255,0.06)", letterSpacing: "0.1em", margin: "0 0 16px" }}>NO RESULTS</p>
            <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Try a different search or filter</p>
          </div>
        )}

        {/* Movie grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 24 }}>
          {mappedMovies.map((movie, i) => (
            <div key={movie.id} className="movie-grid-item" style={{ animationDelay: `${i * 0.035}s` }}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterImage={movie.posterImage}
                releaseYear={movie.releaseYear}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {mappedMovies.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 64 }}>
            <button
              className="page-btn"
              onClick={goToPrevPage}
              disabled={page === 1}
              style={{ padding: "12px 28px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, background: "transparent", color: "rgba(255,255,255,0.4)", fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}
            >
              ← Prev
            </button>
            <div style={{ padding: "12px 24px", border: "1px solid rgba(226,214,9,0.2)", borderRadius: 2, background: "rgba(226,214,9,0.05)", fontFamily: "sans-serif", fontSize: 22, letterSpacing: "0.1em", color: "#E2D609", fontWeight: 700 }}>
              {page}
            </div>
            <button
              className="page-btn"
              onClick={goToNextPage}
              style={{ padding: "12px 28px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, background: "transparent", color: "rgba(255,255,255,0.4)", fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default Movies;