import HeaderView from "./view/header.js";
import StatisticsView from "./view/statistic.js";
// import {generateFilm} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/films-container.js";
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import Api from "./api.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";


// const FILM_COUNT = 6;
const AUTHORIZATION = `Basic eo1w590ik29889e`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
// const END_POINT = `https://12.ecmascript.pages.academy/task-manager`;


// const films = new Array(FILM_COUNT).fill().map(generateFilm);

// const api = new Api(END_POINT, AUTHORIZATION);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
// moviesModel.setFilms(films);

const filterModel = new FilterModel();


// const siteHeaderElement = document.querySelector(`.header`);
// const siteMainElement = document.querySelector(`.main`);

// render(siteHeaderElement, new HeaderView(films), RenderPosition.BEFOREEND);


const filmContainerPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();
filmContainerPresenter.init();


const footerStatistisaContainer = document.querySelector(`.footer__statistics`);
// render(footerStatistisaContainer, new StatisticsView(films), RenderPosition.BEFOREEND);

api.getFilms()
  .then((films) => {
    console.log(films);
    moviesModel.setFilms(UpdateType.INIT, films);
    render(siteHeaderElement, new HeaderView(films), RenderPosition.BEFOREEND);


    render(footerStatistisaContainer, new StatisticsView(films), RenderPosition.BEFOREEND);

  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
  });
  // .catch(() => {
  //   moviesModel.setFilms(UpdateType.INIT, []);
  // });
