import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    response.setHeader("Allow", ["POST"]);
    return response.status(405).json({ error: `Method ${request.method} Not Allowed` });
  }

  const { year, page, genre } = request.body;
  const currentYear = new Date().getFullYear();

  const params = new URLSearchParams({
    sort: "year.decr",
    limit: "12",
    page: String(page || 1),
    year: String(year || currentYear),
  });
  if (genre) params.append("genre", genre);

  try {
    const resp = await fetch(
      `https://moviesdatabase.p.rapidapi.com/titles?${params.toString()}`,
      {
        headers: {
          "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.MOVIE_API_KEY}`,
        },
      }
    );

    if (!resp.ok) {
      return response.status(resp.status).json({ error: "Failed to fetch movies from upstream API" });
    }

    const moviesResponse = await resp.json();
    const movies: MoviesProps[] = moviesResponse.results ?? [];

    return response.status(200).json({ movies });
  } catch (error) {
    console.error("fetch-movies error:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}