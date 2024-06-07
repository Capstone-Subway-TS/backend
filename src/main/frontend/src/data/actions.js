// actions.js

export const SET_START_STATION = 'SET_START_STATION';
export const SET_END_STATION = 'SET_END_STATION';

export const setStartStation = (stationName) => ({
  type: SET_START_STATION,
  payload: stationName,
});

export const setEndStation = (stationName) => ({
  type: SET_END_STATION,
  payload: stationName,
});
