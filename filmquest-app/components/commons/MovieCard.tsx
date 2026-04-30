import { MovieProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_IMAGE = "/images/poster-placeholder.png";

const MovieCard: React.FC<MovieProps> = ({ id, title, posterImage, releaseYear }) => {
  const src = posterImage ?? FALLBACK_IMAGE;

  return (
    <Link
      href={`/movies/${id}`}
      className="group block h-[563px] cursor-pointer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {/* Poster */}
      <div className="relative h-[430px] w-full overflow-hidden rounded-md">
        {/* pointer-events-none so the image never swallows the click */}
        <Image
          src={src}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />

        {/* Hover overlay — also pointer-events-none so it doesn't block */}
        <div className="pointer-events-none absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-14 h-14 rounded-full border-2 border-[#E2D609] flex items-center justify-center">
            <span className="text-[#E2D609] text-xl ml-1">▶</span>
          </div>
        </div>
      </div>

      {/* Title + Year */}
      <div className="flex justify-between py-4">
        <p className="text-xl font-bold truncate pr-2 group-hover:text-[#E2D609] transition-colors duration-300">
          {title}
        </p>
        <p className="text-xl text-[#E2D609] shrink-0">{releaseYear}</p>
      </div>
    </Link>
  );
};

export default MovieCard;