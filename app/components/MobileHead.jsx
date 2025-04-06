// components/MobileHead.jsx
'use client';
import Head from 'next/head';

export default function MobileHead() {
  return (
    <Head>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
    </Head>
  );
}
