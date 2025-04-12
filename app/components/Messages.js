// import GuidePanel from '../panels/GuidePanel';
// import PowersPanel from '../panels/PowersPanel';
// import SavePanel from '../panels/SavePanel';
// import SummonPanel from '../panels/SummonPanel';
// import UnlockPanel from '../panels/UnlockPanel';

const Messages = (props) => {
  return {
    Welcome: `Welcome, ${props.user?.username}.`,
    JourneySaved: 'Your journey was saved!',
  };
};

export default Messages;
