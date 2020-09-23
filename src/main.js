import HeaderView from "./view/header.js";
import StatisticsView from "./view/statistic.js";
import NavigationView from './view/navigation.js';

import {render, RenderPosition} from "./utils/render.js";
import MovieListPresenter from "./presenter/films-container.js";
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import Api from "./api.js";
import {UpdateType, MenuItem} from "./const.js";


const AUTHORIZATION = `Basic eo1w590ik29889e`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatistisaContainer = document.querySelector(`.footer__statistics`);


const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const navigationComponent = new NavigationView();
const filmContainerPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel, navigationComponent);

console.log(navigationComponent.getElement());


const handleMenuTypeChange = (menuItem) => {
  console.log(menuItem);
   // Сбросить активный пункт меню

  switch (menuItem) {
    case MenuItem.FILMS:
      // Скрыть статистику
      // Показать панель фильмов
      break;
    case MenuItem.STATS:
      // Поставить активный пункт меню
      // Скрыть панель фильмов
      // Показать статистику
      break;
  }
};


filterPresenter.init();
filmContainerPresenter.init();

navigationComponent.setMenuTypeChangeHandler(handleMenuTypeChange);
// filterPresenter.setMenuTypeChangeHandler(handleMenuTypeChange);

// const siteNavElement = document.querySelector(`.main-navigation`);



api.getFilms()
  .then((films) => {

    moviesModel.setFilms(UpdateType.INIT, films);
    render(siteHeaderElement, new HeaderView(films), RenderPosition.BEFOREEND);
    render(siteMainElement, navigationComponent, RenderPosition.AFTERBEGIN);

    render(footerStatistisaContainer, new StatisticsView(films), RenderPosition.BEFOREEND);

  });

