import type { FilteredPanelsProps } from '../EarthsongNav';
import GuideAboutPanel from './GuideAboutPanel';
import GuideNavigatePanel from './GuideNavigation';
import GuidePanelSwitcher from './GuidePanelSwitcher';
import GuidePortalPanel from './GuidePortalPanel';
import PowersPanel from './PowersPanel';
import SavePanel from './SavePanel';
import SummonPanel from './SummonPanel';
import UnlockPanel from './UnlockPanel';

export const panels: Record<string, FilteredPanelsProps> = {
  Powers: {
    component: PowersPanel,
    label: 'Powers',
    className: 'text-[rgb(255,145,0)]',
    icon: 6,
    iconClassName: 'h-9 w-9 -rotate-45 text-[rgb(255,145,0)]',
  },
  Summon: {
    component: SummonPanel,
    label: 'Summon',
    icon: 4,
    iconClassName: 'h-6 w-6',
  },
  Unlock: {
    component: UnlockPanel,
    label: 'Unlock',
    icon: 4,
    iconClassName: 'h-6 w-6',
  },
  Save: {
    component: SavePanel,
    label: 'Save',
    icon: 2,
    iconClassName: 'h-6 w-6',
  },
  Guide: {
    component: GuidePanelSwitcher,
    label: 'Guide',
    icon: 2,
    iconClassName: 'h-6.5 w-5',
  },
  Navigate: {
    component: GuideNavigatePanel,
    label: 'Navigate',
  },
  Portal: {
    component: GuidePortalPanel,
    label: 'Portal',
  },
  About: {
    component: GuideAboutPanel,
    label: 'About',
  },
};
