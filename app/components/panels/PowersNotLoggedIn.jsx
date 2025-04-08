import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';

export default function PowersNotLoggedIn() {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);

  return (
    <>
      <p>Welcome, seeker. Salutations from the realm of sound.</p>
      <p>To save and recall your favorite journeys, create an account.</p>
      <p>If you already have an account, sign in.</p>
    </>
  );
}
