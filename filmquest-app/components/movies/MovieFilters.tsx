import Button from "@/components/commons/Button";
import { GENRE_OPTIONS, YEAR_OPTIONS } from "@/constants/navigation";

interface Props {
  year: number | null;
  genre: string;
  onYearChange: (year: number | null) => void;
  onGenreChange: (genre: string) => void;
}

const MovieFilters: React.FC<Props> = ({ year, genre, onYearChange, onGenreChange }) => (
  <div className="py-16">
    {/* Search + Year row */}
    <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
      />
      <select
        value={year ?? ""}
        onChange={(e) =>
          onYearChange(e.target.value ? Number(e.target.value) : null)
        }
        className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
      >
        <option value="">Select Year</option>
        {YEAR_OPTIONS.map((y) => (
          <option value={y} key={y}>
            {y}
          </option>
        ))}
      </select>
    </div>

    {/* Title + Genre buttons row */}
    <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
    <div className="flex flex-col md:flex-row items-center justify-between">
      <h1 className="text-lg md:text-6xl font-bold">
        {year ?? ""} {genre !== "All" ? genre : ""} Movie List
      </h1>
      <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
        {GENRE_OPTIONS.map((g) => (
          <Button key={g} title={g} action={() => onGenreChange(g)} />
        ))}
      </div>
    </div>
  </div>
);

export default MovieFilters;