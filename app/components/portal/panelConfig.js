import GuidePanel from '../panels/GuidePanel';
import PowersPanel from '../panels/PowersPanel';
import SavePanel from '../panels/SavePanel';
import SummonPanel from '../panels/SummonPanel';
import UnlockPanel from '../panels/UnlockPanel';

export const panels = {
  Powers: {
    component: PowersPanel,
    label: 'Powers',
    icon: 3,
    iconClassName: 'h-6 w-6 -rotate-35',
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
    icon: 2,
    iconClassName: 'h-6 w-6',
  },
  Save: {
    component: SavePanel,
    label: 'Save',
    icon: 2,
    iconClassName: 'h-6 w-6',
  },
  Guide: {
    component: GuidePanel,
    label: 'Guide',
    icon: 2,
    iconClassName: 'h-6 w-3',
  },
};
