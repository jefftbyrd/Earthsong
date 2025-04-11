import GuidePanel from '../panels/GuidePanel';
import PowersPanel from '../panels/PowersPanel';
// import SummonPanel from '../panels/SummonPanel';
import UnlockPanel from '../panels/UnlockPanel';

export const panels = {
  Powers: {
    component: PowersPanel,
    label: 'Powers',
  },
  // Summon: {
  //   component: SummonPanel,
  //   label: 'Summon',
  // },
  Unlock: {
    component: UnlockPanel,
    label: 'Unlock',
  },
  Guide: {
    component: GuidePanel,
    label: 'Guide',
  },
};
