import { addClickListenerAndRenderGallery } from './gallery.js';

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((usersPictures) => {
    addClickListenerAndRenderGallery(usersPictures);
  });
