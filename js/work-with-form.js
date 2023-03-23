import { isEscapeKey } from './util.js';

//открытие формы
const imgUploadFile = document.querySelector('#upload-file');
//форма редактирования изображения
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
//для удаления второго скролла
const body = document.body;
//кнопка для закрытия
const imgUploadCancel = document.querySelector('.img-upload__cancel');

//открываем форму для редактирования фото
const showFormEditing = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

//закрываем форму
const closeFormEditing = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

//закрываем форму на кнопку
imgUploadCancel.addEventListener('click', () => {
  closeFormEditing();
});

//закрытие большого фото на клавишу Esc
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormEditing();
  }
}

//открывание формы при выборе фото
imgUploadFile.addEventListener('change', () => {
  showFormEditing();
});


export { showFormEditing };

