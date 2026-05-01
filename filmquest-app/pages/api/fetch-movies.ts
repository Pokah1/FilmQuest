import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    response.setHeader("Allow", ["POST"]);
    return response.status(405).json({ error: `Method ${request.method} Not Allowed` });
  }

  const { year, page, genre, search } = request.body;

  try {
    let url: string;

    if (search && search.trim().length > 0) {
      // ── Search mode: use /search/movie endpoint ──────────────────────────
      const params = new URLSearchParams({
        query: search.trim(),
        page: String(page || 1),
        include_adult: "false",
      });
      url = `https://api.themoviedb.org/3/search/movie?${params.toString()}`;
    } else {
      // ── Discover mode: filter by year + genre ────────────────────────────
      const params = new URLSearchParams({
        sort_by: "popularity.desc",
        page: String(page || 1),
      });
      if (year) params.append("primary_release_year", String(year));
      if (genre) params.append("with_genres", genre);
      url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;
    }

    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });

    if (!resp.ok) {
      const errBody = await resp.json().catch(() => ({}));
      console.error("TMDB error:", errBody);
      return response.status(resp.status).json({ error: "Failed to fetch from TMDB" });
    }

    const data = await resp.json();
    return response.status(200).json({ movies: data.results ?? [] });

  } catch (error) {
    console.error("fetch-movies error:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}