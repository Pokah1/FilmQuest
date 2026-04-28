export type Movie = {
  title: string;
  genre: string;
  year: string;
  rating: string;
  color: string;
  accent: string;
  bg: string;
};

export const MOVIES: Movie[] = [
  {
    title: "Dune: Part Two",
    genre: "Sci-Fi · Epic",
    year: "2024",
    rating: "8.5",
    color: "#C8860A",
    accent: "#F5C518",
    bg: "linear-gradient(160deg, #1a0e00 0%, #3d2200 40%, #C8860A 100%)",
  },
  {
    title: "Oppenheimer",
    genre: "Drama · History",
    year: "2023",
    rating: "8.9",
    color: "#E05C00",
    accent: "#FF8C42",
    bg: "linear-gradient(160deg, #0d0500 0%, #2e1000 40%, #E05C00 100%)",
  },
  {
    title: "Poor Things",
    genre: "Fantasy · Drama",
    year: "2023",
    rating: "8.0",
    color: "#4A7C7E",
    accent: "#7ECBCF",
    bg: "linear-gradient(160deg, #000d0e 0%, #0b2b2d 40%, #4A7C7E 100%)",
  },
  {
    title: "Killers of the Flower Moon",
    genre: "Crime · Western",
    year: "2023",
    rating: "7.7",
    color: "#8B3A3A",
    accent: "#D4785A",
    bg: "linear-gradient(160deg, #0d0000 0%, #2e0e0e 40%, #8B3A3A 100%)",
  },
  {
    title: "Interstellar",
    genre: "Sci-Fi · Adventure",
    year: "2014",
    rating: "8.7",
    color: "#1B4F72",
    accent: "#5DADE2",
    bg: "linear-gradient(160deg, #000508 0%, #051525 40%, #1B4F72 100%)",
  },
  {
    title: "The Godfather",
    genre: "Crime · Drama",
    year: "1972",
    rating: "9.2",
    color: "#2C2C2C",
    accent: "#BFA980",
    bg: "linear-gradient(160deg, #000000 0%, #111111 40%, #2C2C2C 100%)",
  },
];