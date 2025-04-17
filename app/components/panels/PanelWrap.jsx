import { useDynamicHeight } from '../../hooks/useDynamicHeight';
import ClosePanelButton from '../panels/ClosePanelButton';

export default function PanelWrap({ children, panel, bg, ...props }) {
  const { ref } = useDynamicHeight();

  return (
    <div
      ref={ref}
      className="text-black box-border overflow-auto mt-0.5 z-40 relative text-center lg:m-20 lg:border-black/50 lg:border-6"
      style={{ backgroundColor: bg }}
      {...props}
    >
      <ClosePanelButton panel={panel} />
      <div className="p-3 pt-6">
        <h2 className="left-0 right-0 text-6xl lg:text-9xl uppercase opacity-30 text-center">
          {panel}
        </h2>
        <div className="flex flex-col justify-center items-center gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}
