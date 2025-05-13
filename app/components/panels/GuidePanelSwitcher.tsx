import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
import GuideMapPanel from './GuideMapPanel';
import GuidePanel from './GuidePanel';
import GuidePortalPanel from './GuidePortalPanel';

export default function GuidePanelSwitcher({
  phase,
  ...props
}: {
  phase: string;
  [key: string]: any;
}) {
  const { setPanelId } = useContext(journeyContext);

  // Update panelId based on phase when this component mounts
  useEffect(() => {
    if (phase === 'portal' || phase === 'portalRecall') {
      setPanelId('Portal');
    } else if (phase === 'map' || phase === 'returnToMap') {
      setPanelId('Map');
    }
  }, [phase, setPanelId]);

  if (phase === 'portal') return <GuidePortalPanel {...props} />;
  if (phase === 'portalRecall') return <GuidePortalPanel {...props} />;
  if (phase === 'map') return <GuideMapPanel {...props} />;
  if (phase === 'returnToMap') return <GuideMapPanel {...props} />;
  return <GuidePanel {...props} />;
}
