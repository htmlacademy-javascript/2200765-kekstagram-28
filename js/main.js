import './uploading-picture.js';
import './work-with-form.js';
import { getData } from './api.js';
import { setUserFormSubmit, closeFormEditing } from './work-with-form.js';
import { addClickListenerAndRenderGallery } from './gallery.js';
import { showErrorGetData } from './messages.js';
import './filter-picture.js';
import { setRandomClick, setDefaultClick, setDiscussedClick, sortRandomly, compareComments } from './filter-picture.js';

getData()
  .then((usersPictures) => {
    addClickListenerAndRenderGallery(usersPictures);
    setDefaultClick(() => addClickListenerAndRenderGallery(usersPictures));
    setRandomClick(() => addClickListenerAndRenderGallery(usersPictures.slice().sort(sortRandomly).slice(0,10)));
    setDiscussedClick(() => addClickListenerAndRenderGallery(usersPictures.slice().sort(compareComments)));
  })
  .catch(
    (err) => {
      showErrorGetData(err.message);
    }
  );

setUserFormSubmit(closeFormEditing);
