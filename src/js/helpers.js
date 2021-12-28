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
