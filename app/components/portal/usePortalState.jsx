// First, define a reducer function and initial state
import { useReducer } from 'react';

// Define the initial state
const initialState = {
  isOpen: false,
  saveIsOpen: false,
  playing: false,
  displayingItem: null,
  playerTarget: null,
  showSuccessMessage: false,
};

// Define action types as constants to avoid typos
const ACTIONS = {
  SET_PLAYING: 'SET_PLAYING',
  SET_PLAYER_TARGET: 'SET_PLAYER_TARGET',
  SET_DISPLAYING_ITEM: 'SET_DISPLAYING_ITEM',
  TOGGLE_OPEN: 'TOGGLE_OPEN',
  TOGGLE_SAVE_OPEN: 'TOGGLE_SAVE_OPEN',
  SHOW_SUCCESS: 'SHOW_SUCCESS',
  HIDE_SUCCESS: 'HIDE_SUCCESS',
  RESET_ALL: 'RESET_ALL',
};

// Create the reducer function
function portalReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_PLAYING:
      return { ...state, playing: action.payload };
    case ACTIONS.SET_PLAYER_TARGET:
      return { ...state, playerTarget: action.payload };
    case ACTIONS.SET_DISPLAYING_ITEM:
      return { ...state, displayingItem: action.payload };
    case ACTIONS.TOGGLE_OPEN:
      return { ...state, isOpen: action.payload ?? !state.isOpen };
    case ACTIONS.TOGGLE_SAVE_OPEN:
      return { ...state, saveIsOpen: action.payload ?? !state.saveIsOpen };
    case ACTIONS.SHOW_SUCCESS:
      return { ...state, showSuccessMessage: true };
    case ACTIONS.HIDE_SUCCESS:
      return { ...state, showSuccessMessage: false };
    case ACTIONS.RESET_ALL:
      return initialState;
    default:
      return state;
  }
}

// Create a custom hook to use this reducer
export function usePortalState() {
  const [state, dispatch] = useReducer(portalReducer, initialState);

  // Create action creators for cleaner component code
  const actions = {
    setPlaying: (isPlaying) =>
      dispatch({ type: ACTIONS.SET_PLAYING, payload: isPlaying }),
    setPlayerTarget: (target) =>
      dispatch({ type: ACTIONS.SET_PLAYER_TARGET, payload: target }),
    setDisplayingItem: (item) =>
      dispatch({ type: ACTIONS.SET_DISPLAYING_ITEM, payload: item }),
    toggleOpen: (value) =>
      dispatch({ type: ACTIONS.TOGGLE_OPEN, payload: value }),
    toggleSaveOpen: (value) =>
      dispatch({ type: ACTIONS.TOGGLE_SAVE_OPEN, payload: value }),
    showSuccessMessage: () => {
      dispatch({ type: ACTIONS.SHOW_SUCCESS });
      // Auto-hide after 3 seconds
      setTimeout(() => dispatch({ type: ACTIONS.HIDE_SUCCESS }), 3000);
    },
    resetAll: () => dispatch({ type: ACTIONS.RESET_ALL }),
  };

  return [state, actions];
}
