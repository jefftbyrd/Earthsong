import type { NextRequest } from 'next/server';
// middleware.ts
import { NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);

  // Check if the device is a mobile
  if (device.type === 'mobile') {
    // Redirect to the custom mobile-not-supported page
    // const mobileRedirectUrl = new URL('/mobile-not-supported', request.url);
    // return NextResponse.rewrite(mobileRedirectUrl);
  }

  // Allow the request to proceed for non-mobile devices
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
