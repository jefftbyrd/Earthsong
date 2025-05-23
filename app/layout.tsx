import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Noto_Sans_Linear_A } from 'next/font/google';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { getSnapshots } from '../database/snapshots';
import { getUser } from '../database/users';
import { JourneyContextProvider } from './context/journeyContext';
import { SoundPlayerProvider } from './context/soundPlayerContext';
import { SoundsContextProvider } from './context/soundsContext';
import { UserContextProvider } from './context/userContext';

const noto = Noto_Sans_Linear_A({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-noto',
});

const basteleur = localFont({
  variable: '--font-basteleur',
  preload: true,
  display: 'swap',
  src: [
    {
      path: './fonts/Basteleur-Moonlight.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Basteleur-Bold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
});

const abordage = localFont({
  variable: '--font-abordage',
  preload: true,
  display: 'swap',
  src: [
    {
      path: './fonts/Abordage-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie
    ? ((await getUser(sessionTokenCookie.value)) ?? null)
    : null;
  const snapshots =
    user && sessionTokenCookie
      ? (await getSnapshots(sessionTokenCookie.value)).map((snapshot) => ({
          ...snapshot,
          sounds: Array.isArray(snapshot.sounds) ? snapshot.sounds : [],
          location: snapshot.location === null ? undefined : snapshot.location,
        }))
      : [];

  return (
    <html lang="en">
      <head>
        <title>Earthsong</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />

        <link
          rel="preload"
          href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
          as="style"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
          />
        </noscript>
        <link
          rel="preload"
          href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"
          as="script"
        />

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
        className={`${basteleur.variable} ${abordage.variable} ${noto.variable} font-basteleur`}
      >
        <JourneyContextProvider>
          <UserContextProvider user={user} snapshots={snapshots}>
            <SoundsContextProvider>
              <SoundPlayerProvider>{children}</SoundPlayerProvider>
            </SoundsContextProvider>
          </UserContextProvider>
        </JourneyContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
