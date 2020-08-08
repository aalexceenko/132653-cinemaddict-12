import {getRandomInteger, getRandom, generatePosition, getRandomInformation} from "../utils.js";
import {EMOJIS} from "../const.js";

const TITLE = [
  `21`,
  `Профессор`,
  `Матильда`,
  `Разрушение`,
  `Социальная сеть`,
];

const ORIGINAL_TITLE = [
  `21`,
  `The Professor`,
  `Matilda`,
  `Destraction`,
  `The Social Network`,
];

const POSTER = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const NAMES = [
  `Anna Adams`,
  `Betty Brown`,
  `Chris Costner`,
  `David Doe`,
  `Edith Edisson`,
  `Frank Farmer`,
  `George Gatsby`
];

const COUNTRIES = [
  `USA`,
  `UK`,
  `USSR`
];

const AGES = [
  `0+`,
  `6+`,
  `12+`,
  `18+`
];

const GENRE = [
  `action`,
  `comedy`,
  `romantic`,
  `detective`
];

const DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

function generateDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const generateComment = () => {
  const text = DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)];
  const emoji = EMOJIS[getRandomInteger(0, EMOJIS.length - 1)];

  return {
    emoji,
    date: generateDate(new Date(2020, 0, 1), new Date()),
    author: NAMES[getRandomInteger(1, NAMES.length - 1)],
    text
  };

};

export const generateFilm = () => {
  const comments = new Array(getRandomInteger(0, 5)).fill().map(generateComment);

  return {
    title: generatePosition(TITLE),
    origanalTitle: generatePosition(ORIGINAL_TITLE),
    poster: generatePosition(POSTER),
    rating: getRandom(0, 10),
    writer: getRandomInformation(NAMES),
    director: generatePosition(NAMES),
    actors: getRandomInformation(NAMES),
    country: generatePosition(COUNTRIES),
    age: generatePosition(AGES),
    year: generateDate(new Date(1900, 0, 1), new Date(2020, 0, 1)),
    runtime: getRandomInteger(5, 180),
    genres: getRandomInformation(GENRE),
    description: getRandomInformation(DESCRIPTION),
    comments,
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorites: Boolean(getRandomInteger(0, 1))
  };
};
