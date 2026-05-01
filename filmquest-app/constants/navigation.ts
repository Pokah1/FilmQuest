export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { label: "Privacy Policy", href: "/privacy" },
] as const;

// TMDB genre IDs — name is shown in UI, id is sent to the API
export const GENRE_OPTIONS = [
  { label: "All",       id: "" },
  { label: "Animation", id: "16" },
  { label: "Comedy",    id: "35" },
  { label: "Fantasy",   id: "14" },
  { label: "Action",    id: "28" },
  { label: "Drama",     id: "18" },
  { label: "Horror",    id: "27" },
  { label: "Sci-Fi",    id: "878" },
] as const;

export const YEAR_OPTIONS = [2024, 2023, 2022, 2021, 2020, 2019] as const;