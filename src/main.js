import HeaderView from "./view/header.js";
import NavigationView from "./view/navigation.js";
import StatisticsView from "./view/statistic.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/navigation.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/films-container.js";
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';


const FILM_COUNT = 6;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const moviesModel = new MoviesModel();
moviesModel.setFilms(films);
const filterModel = new FilterModel();


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new HeaderView(films), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationView(filters), RenderPosition.BEFOREEND);


const filmContainerPresenter = new MovieListPresenter(siteMainElement, moviesModel);
filmContainerPresenter.init();


const footerStatistisaContainer = document.querySelector(`.footer__statistics`);
render(footerStatistisaContainer, new StatisticsView(films), RenderPosition.BEFOREEND);
