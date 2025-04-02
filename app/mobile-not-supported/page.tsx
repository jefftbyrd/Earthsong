// app/mobile-not-supported/page.tsx
import React from 'react';
import styles from '../styles/ui.module.scss';

const Page = () => {
  return (
    <div className={styles.mobileNotSupported}>
      <h2>Earthsong does not yet support mobile devices</h2>
      <p>Please check back on a desktop or laptop computer.</p>
      <p>
        If you'd like to see Earthsong adapted for mobile, get in touch at{' '}
        <a href="mailto:jeff.t.byrd@gmail.com">jeff.t.byrd@gmail.com</a>.
      </p>
    </div>
  );
};

export default Page;
