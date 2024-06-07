// reducers.js

import { SET_START_STATION, SET_END_STATION } from './actions';

const initialState = {
  startStation: '',
  endStation: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_START_STATION:
      return { ...state, startStation: action.payload };
    case SET_END_STATION:
      return { ...state, endStation: action.payload };
    default:
      return state;
  }
};

export default reducer;
