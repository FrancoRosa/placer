import one from "../assets/audio/distance/1.mp3";
import two from "../assets/audio/distance/2.mp3";
import three from "../assets/audio/distance/3.mp3";
import four from "../assets/audio/distance/4.mp3";
import five from "../assets/audio/distance/5.mp3";
import six from "../assets/audio/distance/6.mp3";
import seven from "../assets/audio/distance/7.mp3";
import eight from "../assets/audio/distance/8.mp3";
import nine from "../assets/audio/distance/9.mp3";
import ten from "../assets/audio/distance/10.mp3";

import black from "../assets/audio/colors/black.mp3";
import blue from "../assets/audio/colors/blue.mp3";
import brown from "../assets/audio/colors/brown.mp3";
import darkblue from "../assets/audio/colors/darkblue.mp3";
import lightblue from "../assets/audio/colors/lightblue.mp3";
import lightgreen from "../assets/audio/colors/lightgreen.mp3";
import orange from "../assets/audio/colors/orange.mp3";
import pink from "../assets/audio/colors/pink.mp3";
import purple from "../assets/audio/colors/purple.mp3";
import red from "../assets/audio/colors/red.mp3";
import white from "../assets/audio/colors/white.mp3";
import yellow from "../assets/audio/colors/yellow.mp3";
import green from "../assets/audio/colors/green.mp3";
import purplewhite from "../assets/audio/colors/purplewhite.mp3";
import brownwhite from "../assets/audio/colors/brownwhite.mp3";

import leftBay from "../assets/audio/other/left_bay.mp3";
import rightBay from "../assets/audio/other/right_bay.mp3";
import nextPile from "../assets/audio/other/next_pile.mp3";

const distanceSounds = [
  new Audio(one),
  new Audio(two),
  new Audio(three),
  new Audio(four),
  new Audio(five),
  new Audio(six),
  new Audio(seven),
  new Audio(eight),
  new Audio(nine),
  new Audio(ten),
];

const otherSounds = {
  leftBay: new Audio(leftBay),
  rightBay: new Audio(rightBay),
  nextPile: new Audio(nextPile),
};

const colorSounds = {
  black: new Audio(black),
  blue: new Audio(blue),
  brown: new Audio(brown),
  darkblue: new Audio(darkblue),
  lightblue: new Audio(lightblue),
  lightgreen: new Audio(lightgreen),
  orange: new Audio(orange),
  pink: new Audio(pink),
  purple: new Audio(purple),
  red: new Audio(red),
  white: new Audio(white),
  yellow: new Audio(yellow),
  green: new Audio(green),
  purplewhite: new Audio(purplewhite),
  brownwhite: new Audio(brownwhite),
};

export const playDistance = (distance) => {
  const dist = parseInt(distance);
  if (dist > 0 && dist < 11) {
    distanceSounds[dist - 1].play();
  }
};

export const playOther = (sound) => {
  if (otherSounds[sound]) otherSounds[sound].play();
};

export const playColor = (color) => {
  if (colorSounds[color]) colorSounds[color].play();
};
