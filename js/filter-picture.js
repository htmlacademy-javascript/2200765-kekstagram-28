import { debounce } from './util.js';
import { renderThumbnails } from './thumbnail.js';

//контйенер с фильтрами
const filterContainer = document.querySelector('.img-filters');
//форма с фильтрами
const formFilterPictures = document.querySelector('.img-filters__form');
//кнопка по умолчанию
const defaultFilterButton = formFilterPictures.querySelector('#filter-default');
//кнопка случайные
const randomFilterButton = formFilterPictures.querySelector('#filter-random');
//кнопка обсуждаемые
const discussedFilterButton = formFilterPictures.querySelector('#filter-discussed');

//показать форму с фильтрами
const showFilters = () => filterContainer.classList.remove('img-filters--inactive');

//удаление картинок
const removeThumbnails = (thumbnails) => thumbnails.forEach((thumbnail) => thumbnail.remove());

//рандомная сортировка
const sortRandom = () => Math.random() - 0.5;

//сортировка комментов
const sortByCommentCount = (a, b) => b.comments.length - a.comments.length;

const filterPhotos = (photos, filterBtn) => {
  if (filterBtn === defaultFilterButton) {
    return photos;
  } else if (filterBtn === randomFilterButton) {
    return photos.slice().sort(sortRandom).slice(0, 10);
  } else if (filterBtn === discussedFilterButton) {
    return photos.slice().sort(sortByCommentCount);
  }
};

const handleFilterButtonClick = (event, photos) => {
  const thumbnails = document.querySelectorAll('.picture');
  const filterBtn = event.target;
  defaultFilterButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');
  filterBtn.classList.add('img-filters__button--active');
  removeThumbnails(thumbnails);
  renderThumbnails(filterPhotos(photos, filterBtn));
};

const setupFiltering = (photos) => {
  formFilterPictures.addEventListener('click', debounce((event) => {
    handleFilterButtonClick(event, photos);
  }));
};

export { setupFiltering, showFilters };
