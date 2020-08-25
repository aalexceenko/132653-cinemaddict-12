import HeaderView from "./view/header.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import StatisticsView from "./view/statistic.js";
import FilmsContainerView from "./view/films-container.js";
import FilmsListView from "./view/films-list.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/navigation.js";
import {render, RenderPosition} from "./utils/render.js";
import ContainerPresenter from "./presenter/films-container.js";

const FILM_COUNT = 10;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new HeaderView(films), RenderPosition.BEFOREEND);


render(siteMainElement, new NavigationView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

const filmsContainerComponent = new FilmsContainerView();

render(siteMainElement, filmsContainerComponent, RenderPosition.BEFOREEND);


const filmListComponent = new FilmsListView();
render(filmsContainerComponent, filmListComponent, RenderPosition.BEFOREEND);


const filmContainerPresenter = new ContainerPresenter(filmsContainerComponent);
filmContainerPresenter.init(films);


const footerStatistisaContainer = document.querySelector(`.footer__statistics`);
render(footerStatistisaContainer, new StatisticsView(films), RenderPosition.BEFOREEND);
