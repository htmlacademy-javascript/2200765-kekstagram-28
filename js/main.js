import './work-with-form.js';

import { getData } from './api.js';

import { setUserFormSubmit, closeFormEditing } from './work-with-form.js';

import { showAlert } from './util.js';

import { addClickListenerAndRenderGallery } from './gallery.js';


getData()
  .then((usersPictures) => {
    addClickListenerAndRenderGallery(usersPictures);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closeFormEditing);
