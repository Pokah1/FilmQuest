import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Movie ID is required" });

  const headers = {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  };

  try {
    // Fetch movie details + credits + videos in parallel
    const [detailRes, creditsRes, videosRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}`, { headers }),
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, { headers }),
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, { headers }),
    ]);

    if (!detailRes.ok) {
      return res.status(detailRes.status).json({ error: "Movie not found" });
    }

    const [detail, credits, videos] = await Promise.all([
      detailRes.json(),
      creditsRes.json(),
      videosRes.json(),
    ]);

    // Find the official YouTube trailer
    const trailer = videos.results?.find(
      (v: { site: string; type: string }) =>
        v.site === "YouTube" && v.type === "Trailer"
    );

    return res.status(200).json({
      id: detail.id,
      title: detail.title,
      tagline: detail.tagline,
      overview: detail.overview,
      poster_path: detail.poster_path,
      backdrop_path: detail.backdrop_path,
      release_date: detail.release_date,
      runtime: detail.runtime,
      vote_average: detail.vote_average,
      vote_count: detail.vote_count,
      genres: detail.genres,
      status: detail.status,
      budget: detail.budget,
      revenue: detail.revenue,
      cast: credits.cast ?? [],
      trailerKey: trailer?.key ?? null,
    });
  } catch (error) {
    console.error("movie-detail error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}