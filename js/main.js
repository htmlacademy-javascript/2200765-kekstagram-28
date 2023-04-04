import './work-with-form.js';
import './filter-picture.js';
import './uploading-picture.js';
import { getData } from './api.js';
import { debounce } from './util.js';
import { showErrorGetData } from './messages.js';
import { addClickListenerAndRenderGallery } from './gallery.js';
import { setUserFormSubmit, closeFormEditing } from './work-with-form.js';
import { setDefaultFilterClick, setRandomFilterClick, setDiscussedFilterClick, compareRandomly, compareComments } from './filter-picture.js';

//панель фильтров
const filterPictures = document.querySelector('.img-filters');

//получаем данные, отрисовываем галлерею, показываем панель фильтров
getData()
  .then((usersPictures) => {
    addClickListenerAndRenderGallery(usersPictures);
    filterPictures.classList.remove('img-filters--inactive');
    setDefaultFilterClick(debounce(() => addClickListenerAndRenderGallery(usersPictures)));
    setRandomFilterClick(debounce(() => addClickListenerAndRenderGallery(usersPictures.slice().sort(compareRandomly).slice(0,10))));
    setDiscussedFilterClick(debounce(() => addClickListenerAndRenderGallery(usersPictures.slice().sort(compareComments))));
  })
  .catch(
    (err) => {
      showErrorGetData(err.message);
    }
  );

setUserFormSubmit(closeFormEditing);
