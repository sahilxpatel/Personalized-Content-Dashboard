import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get('path') || 'trending/movie/week';

  const apiUrl = `https://api.themoviedb.org/3/${path}?api_key=${process.env.TMDB_API_KEY}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: 'Proxy fetch failed' }, { status: 502 });
  }
}
