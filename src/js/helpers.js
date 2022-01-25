import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export const sortByColor = (waypoints) => {
  const byColor = {};
  waypoints.forEach((waypoint) => {
    if (byColor[waypoint.color?.trim()]) byColor[waypoint.color?.trim()] += 1;
    else byColor[waypoint.color?.trim()] = 1;
  });
  return byColor;
};

export const sortByColorPlaced = (waypoints) => {
  const byColor = {};
  waypoints.forEach((waypoint) => {
    if (waypoint.placed) {
      if (byColor[waypoint.color?.trim()]) byColor[waypoint.color?.trim()] += 1;
      else byColor[waypoint.color?.trim()] = 1;
    }
  });
  return byColor;
};

export const colors = {
  black: [0, 0, 0],
  blue: [0, 0, 255],
  brown: [165, 42, 42],
  darkblue: [0, 0, 139],
  green: [0, 255, 0],
  lightblue: [135, 206, 235],
  lightgreen: [144, 238, 144],
  orange: [255, 165, 0],
  pink: [255, 105, 180],
  purple: [128, 0, 128],
  red: [255, 0, 0],
  white: [255, 255, 255],
  yellow: [255, 255, 0],
};

export const colorsFill = {
  black: [0, 0, 0, 128],
  blue: [0, 0, 255, 128],
  brown: [165, 42, 42, 128],
  darkblue: [0, 0, 139, 128],
  green: [0, 255, 0, 128],
  lightblue: [135, 206, 235, 128],
  lightgreen: [144, 238, 144, 128],
  orange: [255, 165, 0, 128],
  pink: [255, 105, 180, 128],
  purple: [128, 0, 128, 128],
  red: [255, 0, 0, 128],
  white: [255, 255, 255, 128],
  yellow: [255, 255, 0, 128],
};

export const getTime = (timestamp) => {
  const stamp = new Date(timestamp * 1000);
  return stamp.toLocaleString().split(", ")[1];
};

export const getGuides = (waypoints) => {
  let lats = waypoints.map((x) => x.lng);
  lats = groupByNeighbor(lats, 0.000005);
  const middles = getMiddles(lats);
  const lngs = waypoints.map((x) => x.lat);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  return {
    middles,
    minLng,
    maxLng,
  };
};

const groupByNeighbor = (arr, th) => {
  let result = [];
  let last;

  arr.sort((a, b) => a - b);
  arr.forEach((e, i) => {
    if (i == 0) {
      last = e;
      result.push(e);
    } else {
      if (e > th + last) {
        last = e;
        result.push(e);
      }
    }
  });
  return result;
};

const getMiddles = (arr) => {
  const result = [];

  arr.forEach((e, i) => {
    if (i > 0) result.push((e + arr[i - 1]) / 2.0);
  });

  return result;
};
