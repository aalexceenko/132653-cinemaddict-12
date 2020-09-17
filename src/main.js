import HeaderView from "./view/header.js";
import StatisticsView from "./view/statistic.js";
import {generateFilm} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/films-container.js";
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';


const FILM_COUNT = 6;

const films = new Array(FILM_COUNT).fill().map(generateFilm);

const moviesModel = new MoviesModel();
moviesModel.setFilms(films);

const filterModel = new FilterModel();


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new HeaderView(films), RenderPosition.BEFOREEND);


const filmContainerPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();
filmContainerPresenter.init();


const footerStatistisaContainer = document.querySelector(`.footer__statistics`);
render(footerStatistisaContainer, new StatisticsView(films), RenderPosition.BEFOREEND);
