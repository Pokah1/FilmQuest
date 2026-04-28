import { useRouter } from "next/router";
import globalStyles from "@/components/home/globalStyles";
import HeroSection from "@/components/home/HeroSection";
import MovieTicker from "@/components/home/Movieticker ";
import MovieShowcase from "@/components/home/Movieshowcase ";
import JoinCTA from "@/components/home/Joincta ";

const Home: React.FC = () => {
  const router = useRouter();
  const goToMovies = () => router.push("/movies", undefined, { shallow: false });

  return (
    <div
      style={{
        background: "#0A0C10",
        color: "white",
        fontFamily: "'Georgia', serif",
        overflowX: "hidden",
      }}
    >
      <style>{globalStyles}</style>

      <HeroSection onBrowse={goToMovies} />
      <MovieTicker />
      <MovieShowcase onViewAll={goToMovies} />
      <JoinCTA />
    </div>
  );
};

export default Home;