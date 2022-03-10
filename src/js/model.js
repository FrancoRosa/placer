import { action } from "easy-peasy";

const initial = {
  waypoints: [],
};

const getStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key)) || initial[key];
};

const setStorage = (key, obj) => {
  window.localStorage.setItem(key, JSON.stringify(obj));
};

export default {
  nextPiles: [
    { distance: null, pile_id: null },
    { distance: null, pile_id: null },
  ],
  setNextPiles: action((state, nextPiles) => {
    state.nextPiles = [...nextPiles];
  }),

  clearPile: action((state, index) => {
    let tempPiles = [...state.nextPiles];
    tempPiles[index] = {};
    state.nextPiles = tempPiles;
  }),

  waypoints: getStorage("waypoints"),

  setWaypoints: action((state, waypoints) => {
    setStorage("waypoints", waypoints);
    state.waypoints = [...waypoints];
  }),

  placeWaypoint: action((state, id) => {
    let newWaypoints = state.waypoints.map((waypoint) => {
      return waypoint.pile_id == id ? { ...waypoint, placed: true } : waypoint;
    });
    setStorage("waypoints", newWaypoints);
    state.waypoints = newWaypoints;
  }),

  unplaceWaypoint: action((state, id) => {
    let newWaypoints = state.waypoints.map((waypoint) => {
      return waypoint.pile_id == id ? { ...waypoint, placed: false } : waypoint;
    });
    setStorage("waypoints", newWaypoints);
    state.waypoints = newWaypoints;
  }),

  selectedColor: "",
  setSelectedColor: action((state, color) => {
    state.selectedColor = color;
  }),

  center: {
    heading: 0,
    lat: 0,
    lng: 0,
    truck: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    distY: [0, 0],
    distX: [0, 0],
    centDist: [{}, {}],
    accuracy: 2,
    rel_distance: 5,
    rel_heading: 30,
    week_timestamp: 0,
  },
  setCenter: action((state, center) => {
    state.center = center;
  }),
  beep: false,
  setBeep: action((state, beep) => {
    state.beep = beep;
  }),
};
