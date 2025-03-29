import './globals.css';
import '@fontsource/noto-sans-linear-a';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { getSnapshots } from '../database/snapshots';
import { getUser } from '../database/users';
import AppWrapper from './context';

const basteleurMoonlight = localFont({
  src: './fonts/Basteleur-Moonlight.woff2',
  variable: '--font-basteleurM',
  weight: '300',
});

const basteleurBold = localFont({
  src: './fonts/Basteleur-Bold.woff2',
  variable: '--font-basteleurB',
  weight: '900',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  const snapshots = user && (await getSnapshots(sessionTokenCookie.value));

  return (
    <html lang="en">
      <head>
        <title>Earthsong</title>
        <meta name="author" content="Jeff T Byrd" />
        <meta name="description" content="Listen to the planet." />
        <meta name="og:url" content="https://earthsong.world" />
        <meta name="og:type" content="website" />
        <meta property="og:title" content="Earthsong" />
        <meta property="og:description" content="Listen to the planet." />
        <meta
          property="og:image"
          content="https://earthsong.world/earthsong-screen.webp"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="earthsong.world" />
        <meta property="twitter:url" content="https://earthsong.world" />
        <meta name="twitter:title" content="Earthsong" />
        <meta name="twitter:description" content="Listen to the planet." />
        <meta
          name="twitter:image"
          content="https://earthsong.world/earthsong-screen.webp"
        />
      </head>

      <body
        className={`${basteleurBold.variable} ${basteleurMoonlight.variable}`}
      >
        <AppWrapper user={user} snapshots={snapshots}>
          {children}
        </AppWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
