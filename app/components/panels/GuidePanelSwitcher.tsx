// import GuideAboutPanel from './GuideAboutPanel';
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
  if (phase === 'portal') return <GuidePortalPanel {...props} />;
  if (phase === 'portalRecall') return <GuidePortalPanel {...props} />;
  if (phase === 'map') return <GuideMapPanel {...props} />;
  if (phase === 'returnToMap') return <GuideMapPanel {...props} />;
  return <GuidePanel {...props} />;
}
