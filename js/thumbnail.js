
//нашли шаблон изображения случайного пользователя
const templatePicture = document
  .querySelector('#picture')
  .content.querySelector('.picture');
//нашли контейнер для изображений от других пользователей
const pictureContainer = document.querySelector('.pictures');

const createThumbnail = ({ url, description, comments, likes, id }) => {
  const userPicture = templatePicture.cloneNode(true);

  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__img').alt = description;
  userPicture.querySelector('.picture__comments').textContent = comments.length;
  userPicture.querySelector('.picture__likes').textContent = likes;
  userPicture.dataset.thumbnailId = id;

  return userPicture;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const userPicture = createThumbnail(picture);
    fragment.append(userPicture);
  });
  pictureContainer.append(fragment);
};

export { renderThumbnails };
