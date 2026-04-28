export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { label: "Privacy Policy", href: "/privacy" },
] as const;

export const GENRE_OPTIONS = ["All", "Animation", "Comedy", "Fantasy"] as const;

export const YEAR_OPTIONS = [2024, 2023, 2022, 2021, 2020, 2019] as const;