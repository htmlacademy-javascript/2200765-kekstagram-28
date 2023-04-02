import { debounce } from './util.js';

//форма с фильтрами
const formFilterPictures = document.querySelector('.img-filters__form');
//кнопка по умолчанию
const defaultFilterButton = formFilterPictures.querySelector('#filter-default');
//кнопка случайные
const randomFilterButton = formFilterPictures.querySelector('#filter-random');
//кнопка обсуждаемые
const discussedFilterButton = formFilterPictures.querySelector('#filter-discussed');


//удаление картинок
const removePictures = (usersPictures) => usersPictures.forEach((picture) => picture.remove());

//перекидывание активного класса
const removeActiveClassButton = () => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
};

//по умолчанию
const setDefaultFilterClick = (cb) => {
  defaultFilterButton.addEventListener ('click', debounce((evt) => {
    removeActiveClassButton();
    if (evt.target === defaultFilterButton) {
      defaultFilterButton.classList.add('img-filters__button--active');
      removePictures(document.querySelectorAll('.picture'));
      cb();
    }
  }));
};

//случайные
const setRandomFilterClick = (cb) => {
  randomFilterButton.addEventListener ('click', debounce((evt) => {
    removeActiveClassButton();
    if (evt.target === randomFilterButton) {
      randomFilterButton.classList.add('img-filters__button--active');
      removePictures(document.querySelectorAll('.picture'));
      cb();
    }
  }));
};

//обсуждаемые
const setDiscussedFilterClick = (cb) => {
  discussedFilterButton.addEventListener ('click', debounce((evt) => {
    removeActiveClassButton();
    if (evt.target === discussedFilterButton) {
      discussedFilterButton.classList.add('img-filters__button--active');
      removePictures(document.querySelectorAll('.picture'));
      cb();
    }
  }));
};

//сортировка рандомная
const compareRandomly = () => Math.random() - 0.5;

//сортировка по комментам
const compareComments = (pictureA, pictureB) => {
  const rankA = pictureA.comments.length;
  const rankB = pictureB.comments.length;
  return rankB - rankA;
};

export { compareRandomly, compareComments, setDefaultFilterClick, setRandomFilterClick, setDiscussedFilterClick };
