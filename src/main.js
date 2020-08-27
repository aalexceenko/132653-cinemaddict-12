import HeaderView from "./view/header.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import StatisticsView from "./view/statistic.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/navigation.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/films-container.js";

const FILM_COUNT = 12;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new HeaderView(films), RenderPosition.BEFOREEND);


render(siteMainElement, new NavigationView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);


const filmContainerPresenter = new MovieListPresenter(siteMainElement);
filmContainerPresenter.init(films);


const footerStatistisaContainer = document.querySelector(`.footer__statistics`);
render(footerStatistisaContainer, new StatisticsView(films), RenderPosition.BEFOREEND);
