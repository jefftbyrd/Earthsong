import GuideNavigation from './GuideNavigation';
import PanelWrap from './PanelWrap';

export default function GuideMapPanel() {
  return (
    <PanelWrap
      panel="Map"
      className="bg-[#1F102A] text-white tracking-wide"
      panelTheme="dark"
    >
      <h3 className="panelMessage">
        Choose a place to explore by selecting a point on the map
      </h3>
      <ul className="list-disc list-inside mb-5 text-left">
        <li>
          <span className="itemTitle">Scroll around:</span> Hold one finger down
          on the screen and move it in any direction.
        </li>
        <li>
          <span className="itemTitle">Gradually zoom in/out:</span> Pinch with
          two fingers to adjust the zoom level. Move fingers apart to zoom in,
          move fingers closer together to zoom out.
        </li>
        <li>
          <span className="itemTitle">Rotate:</span> Hold two fingers down on
          the screen and move them in a circular motion to rotate the map
          (adjust the bearing).
        </li>
        <li>
          <span className="itemTitle">Zoom in one zoom level:</span> Double tap
          on the screen with one finger to zoom in on the map's anchor point.
        </li>
        <li>
          <span className="itemTitle">Zoom out one zoom level:</span> Double tap
          on the screen with two fingers to zoom out with the map's anchor point
          centered.
        </li>
        <li>
          <span className="itemTitle">Quick zoom:</span> Double tap and drag up
          on the screen to zoom out, or double tap and drag down to zoom in.
        </li>
      </ul>

      <GuideNavigation />
    </PanelWrap>
  );
}
