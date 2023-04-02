import { renderThumbnails } from './thumbnail.js';
import { showBigPicture } from './big-picture.js';

const picturesElement = document.querySelector('.pictures');

const addClickListenerAndRenderGallery = (pictures) => {
  picturesElement.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    showBigPicture(picture);
  });

  renderThumbnails(pictures, picturesElement);
};

export { addClickListenerAndRenderGallery };
