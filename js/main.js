import './work-with-form.js';
import './filter-picture.js';
import './uploading-picture.js';
import { getData } from './api.js';
import { showErrorGetData } from './messages.js';
import { addClickListenerAndRenderGallery } from './gallery.js';
import { setUserFormSubmit, closeFormEditing } from './work-with-form.js';
import { setupFiltering, showFilters } from './filter-picture.js';

//получаем данные, отрисовываем галлерею, показываем панель фильтров
getData()
  .then((usersPictures) => {
    addClickListenerAndRenderGallery(usersPictures);
    showFilters();
    setupFiltering(usersPictures);
  })
  .catch(
    (err) => {
      showErrorGetData(err.message);
    }
  );

setUserFormSubmit(closeFormEditing);
