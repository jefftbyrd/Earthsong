import GuideNavigation from './GuideNavigation';
import PanelWrap from './PanelWrap';

export default function GuideMapPanel() {
  return (
    <PanelWrap panel="Map" className="bg-[#5381C4]">
      <h3 className="text-xl mb-5">
        Choose a place to explore by selecting a point on the map.
      </h3>
      <ul className="list-disc list-inside mb-5 text-left">
        <li>
          <strong>Scroll around:</strong> Hold one finger down on the screen and
          move it in any direction.
        </li>
        <li>
          <strong>Gradually zoom in/out:</strong> Pinch with two fingers to
          adjust the zoom level. Move fingers apart to zoom in, move fingers
          closer together to zoom out.
        </li>
        <li>
          <strong>Rotate:</strong> Hold two fingers down on the screen and move
          them in a circular motion to rotate the map (adjust the bearing).
        </li>
        <li>
          <strong>Zoom in one zoom level:</strong> Double tap on the screen with
          one finger to zoom in on the map's anchor point.
        </li>
        <li>
          <strong>Zoom out one zoom level:</strong> Double tap on the screen
          with two fingers to zoom out with the map's anchor point centered.
        </li>
        <li>
          <strong>Quick zoom:</strong> Double tap and drag up on the screen to
          zoom out, or double tap and drag down to zoom in.
        </li>
      </ul>

      <GuideNavigation />
    </PanelWrap>
  );
}
