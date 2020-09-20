import HeaderView from "./view/header.js";
import StatisticsView from "./view/statistic.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/films-container.js";
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import Api from "./api.js";
import {UpdateType} from "./const.js";


const AUTHORIZATION = `Basic eo1w590ik29889e`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatistisaContainer = document.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();


const filmContainerPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();
filmContainerPresenter.init();


api.getFilms()
  .then((films) => {

    moviesModel.setFilms(UpdateType.INIT, films);
    render(siteHeaderElement, new HeaderView(films), RenderPosition.BEFOREEND);
    render(footerStatistisaContainer, new StatisticsView(films), RenderPosition.BEFOREEND);

  });
