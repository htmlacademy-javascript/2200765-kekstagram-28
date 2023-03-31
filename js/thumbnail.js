
//нашли шаблон изображения случайного пользователя
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
//нашли контейнер для изображений от других пользователей
const pictureContainer = document.querySelector('.pictures');
//панель фильтров
const filterPictures = document.querySelector('.img-filters');

//ОТРИСОВКА!
const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures

    .forEach(({ url, description, comments, likes, id }) => {
      const userPicture = templatePicture.cloneNode(true);

      userPicture.querySelector('.picture__img').src = url;
      userPicture.querySelector('.picture__img').alt = description;
      userPicture.querySelector('.picture__comments').textContent = comments.length;
      userPicture.querySelector('.picture__likes').textContent = likes;
      userPicture.dataset.thumbnailId = id;

      fragment.appendChild(userPicture);
    });


  pictureContainer.appendChild(fragment);
  filterPictures.classList.remove('img-filters--inactive');
};

export { renderThumbnails };
