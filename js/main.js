import './work-with-form.js';
import { getData } from './api.js';
import { setUserFormSubmit, closeFormEditing } from './work-with-form.js';
import { addClickListenerAndRenderGallery } from './gallery.js';
import { showErrorGetData } from './messages.js';


getData()
  .then((usersPictures) => {
    addClickListenerAndRenderGallery(usersPictures);
  })
  .catch(
    (err) => {
      showErrorGetData(err.message);
    }
  );

setUserFormSubmit(closeFormEditing);
