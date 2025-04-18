import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse<any>> {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius');

  if (!lat || !lng || !radius) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 },
    );
  }

  const filter = encodeURIComponent(
    `{!geofilt sfield=geotag pt=${lat},${lng} d=${radius}}`,
  );

  try {
    const response = await fetch(
      `https://freesound.org/apiv2/search/text/?filter=${filter}&fields=previews,name,description,username,id,tags,duration,geotag,url&page_size=100&token=${process.env.FREESOUND_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Freesound data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
