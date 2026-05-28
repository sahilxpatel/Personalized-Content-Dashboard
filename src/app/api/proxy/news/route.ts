import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const topic = url.searchParams.get('topic') || 'general';
  const lang = url.searchParams.get('lang') || 'en';
  const max = url.searchParams.get('max') || '10';

  const apiUrl = `https://gnews.io/api/v4/top-headlines?topic=${encodeURIComponent(topic)}&lang=${encodeURIComponent(lang)}&max=${encodeURIComponent(max)}&token=${process.env.NEWS_API_KEY}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Proxy fetch failed' }, { status: 502 });
  }
}
