// For generating random numbers within the given range
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// For getting digits extracted from random number
export const getDigitsArray = (number: number): string[] => {
  return number.toString().split("");
};

const numToText = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  0: "zero",
};

const indexToCheckBoxValue = {
  0: "cb1",
  1: "cb2",
  2: "cb3",
};

const indexToRadioButtonValue = {
  0: "rd1",
  1: "rd2",
  2: "rd3",
};

export const getNumToTextForDisplay = (digitsArray: string[]): string => {
  return digitsArray.map((num) => numToText[num]).join(", ");
};

export const getCheckBoxValue = (cbIndex: number): string => {
  return indexToCheckBoxValue[cbIndex];
};

export const getRadioButtonValue = (rdIndex: number): string => {
  return indexToRadioButtonValue[rdIndex];
};
