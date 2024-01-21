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

export const getNumToTextForDisplay = (digitsArray: string[]): string => {
  return digitsArray.map((num) => numToText[num]).join(", ");
};
