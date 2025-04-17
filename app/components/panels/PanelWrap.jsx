import { useDynamicHeight } from '../../hooks/useDynamicHeight';
import ClosePanelButton from '../panels/ClosePanelButton';

export default function PanelWrap({ children, panel, bg }) {
  const { ref } = useDynamicHeight();

  return (
    <div
      ref={ref}
      className="text-black box-border overflow-auto mt-0.5 z-40 relative"
      style={{ backgroundColor: bg }}
    >
      <ClosePanelButton panel={panel} />
      <div className="p-3 pt-6">
        <h2 className="left-0 right-0 text-7xl uppercase opacity-30 text-left">
          {panel}
        </h2>
        <div className="p-5 grid gap-5">{children}</div>
      </div>
    </div>
  );
}
