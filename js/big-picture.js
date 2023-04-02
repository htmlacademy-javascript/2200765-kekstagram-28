import { isEscapeKey } from './util.js';

const COMMENTS_PER_PORTION = 5;

//большое фото
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
//кол-во лайков на большом фото
const bigPictureLikes = bigPicture.querySelector('.likes-count');
//кол-во комментов на большом фото
const bigPictureComments = bigPicture.querySelector('.comments-count');
//крестик на большом фото
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
//контейнер со ВСЕМИ комментами на большом фото
const commentsContainer = document.querySelector('.social__comments');
//один коммент
const socialComment = commentsContainer.querySelector('.social__comment');
//кол-во комментариев
const commentsCount = bigPicture.querySelector('.social__comment-count');
//описание под большим фото
const photoCaption = bigPicture.querySelector('.social__caption');
//кнопка загрузки комментов
const loadCommentsButton = bigPicture.querySelector('.comments-loader');
//для удаления второго скролла
const body = document.querySelector('body');

let currentCommentsCount = COMMENTS_PER_PORTION;
let updateLoadMoreClick;

//закрываем большое фото
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsContainer.innerHTML = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

//закрытие большого фото по крестику
cancelBigPicture.addEventListener('click', () => {
  closeBigPicture();
});

//закрытие большого фото на клавишу Esc
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

//создаем один комментарий
const createComment = (comment) => {
  const commentElement = socialComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

//создаем список комментариев
const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.slice(0, currentCommentsCount).forEach((comment) => {
    commentsFragment.append(createComment(comment));
  });
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
  if (currentCommentsCount >= comments.length) {
    currentCommentsCount = comments.length;
    loadCommentsButton.classList.add('hidden');
    loadCommentsButton.removeEventListener('click', updateLoadMoreClick);
  } else {
    loadCommentsButton.classList.remove('hidden');
  }
  commentsCount.textContent = `${currentCommentsCount} из ${comments.length} комментариев`;
};


//открываем большое фото
const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsContainer.innerHTML = '';
  document.addEventListener('keydown', onDocumentKeydown);
  currentCommentsCount = COMMENTS_PER_PORTION;
  bigPictureImg.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  photoCaption.textContent = picture.description;
  bigPictureComments.textContent = picture.comments.length;

  updateLoadMoreClick = () => {
    currentCommentsCount += COMMENTS_PER_PORTION;
    renderComments(picture.comments);
  };
  loadCommentsButton.addEventListener('click', updateLoadMoreClick);
  renderComments(picture.comments);
};

export { showBigPicture };
