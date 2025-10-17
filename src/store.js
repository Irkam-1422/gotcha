import { createStore } from 'redux';

const initialState = {
  user: null,
  view: "dashboard",
  showDeathModal: { show: false, killer: null },
  showGhostModal: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'setUser':
      return { ...state, user: action.payload };
    case 'setView':
      return { ...state, view: action.payload };
    case 'showDeathModal':
      return { ...state, showDeathModal: action.payload };
    case 'showGhostModal':
      return { ...state, showGhostModal: action.payload };
    case 'showMurderSuccess':
      return { ...state, showMurderSuccess: action.payload };
    case 'showMurderFail':
      return { ...state, showMurderFail: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;