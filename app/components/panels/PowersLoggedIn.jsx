import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';

export default function PowersLoggedIn() {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);

  return (
    <>
      <p>Greetings, SebiTheWizard. What power will you wield?</p>
      <p>Save this journey</p>
      <p>Recall a saved journey</p>
      <p>Sign out</p>
    </>
  );
}
