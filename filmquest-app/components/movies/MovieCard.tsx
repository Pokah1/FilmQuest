import { MovieProps } from "@/interfaces";
import Image from "next/image";

const FALLBACK_IMAGE = "/images/poster-placeholder.png";

const MovieCard: React.FC<MovieProps> = ({ title, posterImage, releaseYear }) => {
  const src = posterImage ?? FALLBACK_IMAGE;

  return (
    <div className="h-[563px]">
      <div className="relative h-[430px] w-full">
        <Image
          className="rounded-md hover:cursor-pointer object-cover"
          src={src}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
          alt={title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
      </div>
      <div className="flex justify-between py-4">
        <p className="text-xl font-bold truncate pr-2">{title}</p>
        <p className="text-xl text-[#E2D609] shrink-0">{releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;