import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
// import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';

export default function GuidePanel() {
  const { panelOpen, togglePanel } = useContext(journeyContext);
  useEffect(() => {
    // Create handler function for document-level keyboard events
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && panelOpen) {
        togglePanel();
      }
    };

    // Add keyboard event listener to document
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [panelOpen, togglePanel]);

  return (
    <PanelWrap panel="Guide" bg="#5381C4">
      <p>This is the guide content</p>
      <p>
        Breastfeeding is good for babies and moms. Infants that are breastfed
        get antibodies from their mothers against common illnesses. Breastfed
        babies have less chance of being obese as an adult. Breastfeeding a baby
        lets the infant-mother pair bond in a very unique way. Mother’s who
        breastfeed lower their chances of developing breast cancer. Usually,
        mothers who breastfeed lose their pregnancy weight more quickly and
        easily. The benefits of breastfeeding are numerous. Dragons don't exist
        they said. They are the stuff of legend and people's imagination. Greg
        would have agreed with this assessment without a second thought 24 hours
        ago. But now that there was a dragon staring directly into his eyes, he
        questioned everything that he had been told. The song came from the
        bathroom belting over the sound of the shower's running water. It was
        the same way each day began since he could remember. It listened
        intently and concluded that the singing today was as terrible as it had
        ever been. Colors bounced around in her head. They mixed and threaded
        themselves together. Even colors that had no business being together.
        They were all one, yet distinctly separate at the same time. How was she
        going to explain this to the others? Wandering down the path to the pond
        had become a daily routine. Even when the weather wasn't cooperating
        like today with the wind and rain, Jerry still took the morning stroll
        down the path until he reached the pond. Although there didn't seem to
        be a particular reason Jerry did this to anyone looking in from the
        outside, those who knew him well knew exactly what was going on. It
        could all be traced back to a specific incident that happened exactly 5
        years previously. The shoes had been there for as long as anyone could
        remember. In fact, it was difficult for anyone to come up with a date
        they had first appeared. It had seemed they'd always been there and yet
        they seemed so out of place. Why nobody had removed them was a question
        that had been asked time and again, but while they all thought it,
        nobody had ever found the energy to actually do it. So, the shoes
        remained on the steps, out of place in one sense, but perfectly normal
        in another. Sleeping in his car was never the plan but sometimes things
        don't work out as planned. This had been his life for the last three
        months and he was just beginning to get used to it. He didn't actually
        enjoy it, but he had accepted it and come to terms with it. Or at least
        he thought he had. All that changed when he put the key into the
        ignition, turned it and the engine didn't make a sound. April seriously
        wondered about her sleeping partner choices. She looked at her bed and
        what a mess it had become. How did she get to the point in her life
        where she had two dogs, three cats, and a raccoon sleeping with her
        every night? There was nothing else to do. The deed had already been
        done and there was no going back. It now had been become a question of
        how they were going to be able to get out of this situation and escape.
      </p>
    </PanelWrap>
  );
}
