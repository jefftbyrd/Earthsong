import { NextResponse } from 'next/server';
import { z } from 'zod';

type RootResponseBodyGet =
  | {
      snapshots: string;
    }
  | {
      error: string;
    };

const userSchema = z.object({
  name: z.string(),
});

export function GET(): NextResponse<RootResponseBodyGet> {
  return NextResponse.json({ snapshots: '/api/snapshots' });
}

export async function POST(
  request: Request,
): Promise<NextResponse<RootResponseBodyGet>> {
  const requestBody = await request.json();

  const result = userSchema.safeParse(requestBody);
  // console.log('zod result', result);

  if (!result.success) {
    return NextResponse.json(
      {
        error:
          'You need to send an object with name property, eg. {"name":"Karl"}',
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({ snapshots: '/api/snapshots' });
}
