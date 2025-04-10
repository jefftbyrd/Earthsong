import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';

export default function Register() {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);

  return (
    <div className="grid gap-5">
      <p className="text-xl">Create an account</p>
    </div>
  );
}
