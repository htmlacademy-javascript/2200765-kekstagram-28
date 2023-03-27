import { isEscapeKey, showAlert } from './util.js';
import './scale.js';
import './slider.js';

//регулярка для хэштэга
const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
//макс число хэштэгов
const MAX_COUNT_HASHTAG = 5;

//открытие формы
const imgUploadFile = document.querySelector('#upload-file');
//вся форма
const imgUploadForm = document.querySelector('.img-upload__form');
//форма редактирования изображения
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
//для удаления второго скролла
const body = document.body;
//кнопка для закрытия
const imgUploadCancel = document.querySelector('.img-upload__cancel');
//поле хэштэга
const hashtagField = imgUploadForm.querySelector('.text__hashtags');
//поле описания
const commentField = imgUploadForm.querySelector('.text__description');

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

//отменяем закрытие при активном поле хэштэга или коммента
const isFieldInputActive = () => document.activeElement === hashtagField || document.activeElement === commentField;

//закрытие большого фото на клавишу Esc
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isFieldInputActive()) {
    evt.preventDefault();
    closeFormEditing();
  }
}


//начинаем проверку валидности
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//проверка посимвольно
function validateHashtag (value) {
  const hashtagsArray = value.split(' ');
  return !value.length ? true : hashtagsArray.every((hashtags) => REGEXP.test(hashtags));
}

pristine.addValidator(
  hashtagField,
  validateHashtag,
  'Неправильно написан хэш-тег!'
);


//проверка на число тэгов
function validateHashtagCount (value) {
  const hashtagsArray = value.split(' ');
  return hashtagsArray.length <= MAX_COUNT_HASHTAG;
}

pristine.addValidator(
  hashtagField,
  validateHashtagCount,
  'Нельзя указать больше 5 хэш-тегов!'
);

//проверка на повторения тэгов
function validateHashtagDublicates (value) {
  const hashtagsArray = value.toLowerCase().split(' ');
  return new Set(hashtagsArray).size === hashtagsArray.length;
}

pristine.addValidator(
  hashtagField,
  validateHashtagDublicates,
  'Использованы одинаковые хэш-теги!'
);


//открывание формы при выборе фото
imgUploadFile.addEventListener('change', () => {
  showFormEditing();
});

//обработчик на форму

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      fetch(
        'https://28.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if(response.ok) {
            onSuccess();
          } else {
            throw new Error('Данные невалидны');
          }
        })
        .catch((err) => {
          showAlert(err.message);
        });
    }
  });
};

export { showFormEditing, setUserFormSubmit, closeFormEditing };
