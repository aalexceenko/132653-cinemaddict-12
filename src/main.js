import HeaderView from "./view/header.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import StatisticsView from "./view/statistic.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/navigation.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/films-container.js";
import {SortType} from "./const.js";
import {sortFilmDown, sortFilmRating} from "./utils/film.js";

const FILM_COUNT = 12;

let films = new Array(FILM_COUNT).fill().map(generateFilm);
let sourceFilms = films.slice();
const filters = generateFilter(films);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new HeaderView(films), RenderPosition.BEFOREEND);


render(siteMainElement, new NavigationView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

// const sort = new SortView().getElement();
const filmContainerPresenter = new MovieListPresenter(siteMainElement);
// console.log(films);

filmContainerPresenter.init(films);

const sortFilms = (sortType) => {

  switch (sortType) {
    case SortType.DATE_DOWN:
      films.sort(sortFilmDown);
      break;
    case SortType.RATING_DOWN:
      films.sort(sortFilmRating);
      break;
    default:
      films = sourceFilms.slice();
  }

  // currentSortType = sortType;
};

const sortTypeChangeHandler = (evt) => {

  if (evt.target.tagName !== `A`) {
    return;

  }

  evt.preventDefault();

  let sortType = evt.target.dataset.sortType;
  // let currentSortType = SortType.DEFAULT;


  sortFilms(sortType);
  // console.log(films);

  // const filmContainerPresenter = new MovieListPresenter(siteMainElement);
  // console.log(films);

  filmContainerPresenter.init(films);


};

// sort.addEventListener(`click`, sortTypeChangeHandler);
document.querySelector(`.sort`).addEventListener(`click`, sortTypeChangeHandler);


// const filmContainerPresenter = new MovieListPresenter(siteMainElement);
// console.log(films);

// filmContainerPresenter.init(films);


const footerStatistisaContainer = document.querySelector(`.footer__statistics`);
render(footerStatistisaContainer, new StatisticsView(films), RenderPosition.BEFOREEND);
