import {EMOJIS} from "../const.js";
import {getRandomArrayItem, getRandomArrayItems, generateId} from "../utils/common.js";
import {generateDate} from "../utils/film.js";

const COMMENTS_TEXT = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const NAMES = [
  `Ivan Ivanov`,
  `Alexey Sidorov`,
  `Anna Smirnova`,
  `Petr Petrov`
];


export const generateComment = () => ({
  id: generateId(),
  emoji: getRandomArrayItem(EMOJIS),
  text: getRandomArrayItems(COMMENTS_TEXT),
  author: getRandomArrayItem(NAMES),
  date: generateDate(new Date(2020, 0, 1), new Date()),
});
