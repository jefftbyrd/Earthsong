import GuidePanel from '../panels/GuidePanel';
import PowersPanel from '../panels/PowersPanel';
import SummonPanel from '../panels/SummonPanel';
import UnlockPanel from '../panels/UnlockPanel';

export const panels = {
  Powers: {
    component: PowersPanel,
    label: 'Powers',
    icon: 3,
  },
  Summon: {
    component: SummonPanel,
    label: 'Summon',
    icon: 4,
  },
  Unlock: {
    component: UnlockPanel,
    label: 'Unlock',
    icon: 2,
  },
  // Guide: {
  //   component: GuidePanel,
  //   label: 'Guide',
  //   icon: 2,
  // },
};
