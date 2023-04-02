import { isEscapeKey } from './util.js';

//шаблон ошибки
const messageError = document.querySelector('#error').content.querySelector('.error');
//шаблон успешной отправки
const messageSuccess = document.querySelector('#success').content.querySelector('.success');


//ошибка при получении данных
const showErrorGetData = (error) => {
  const messageTemp = messageError.cloneNode(true);
  messageTemp.querySelector('.error__title').textContent = error;
  document.addEventListener('keydown', onDocumentKeydownError);
  messageTemp.querySelector('.error__button').classList.add('hidden');
  document.body.append(messageTemp);

  setTimeout(() => {
    messageTemp.remove();
  }, 5000);
};

//сообщение об ошибке отправки данных
//закрываем окно ошибки
const closeErrorPopup = () => {
  document.removeEventListener('keydown', onDocumentKeydownError);
  const errorPopup = document.querySelector('.error');
  errorPopup.remove();
};

//закрываем по клику вне окна
const onOutSideErrorClick = (evt) => {
  const errorPopup = document.querySelector('.error__inner');
  if (evt.target !== errorPopup) {
    closeErrorPopup();
  }
};

//показываем ошибку
const showErrorSendData = () => {
  const messageTemp = messageError.cloneNode(true);
  messageTemp.querySelector('.error__button').addEventListener('click', closeErrorPopup);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('click', onOutSideErrorClick, { once: true });
  document.body.append(messageTemp);
};

function onDocumentKeydownError(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
}

//сообщение об успешной отправки данных
//закрываем окно успешной отправки
const closeSuccessPopup = () => {
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
  const successPopup = document.querySelector('.success');
  successPopup.remove();
};

//закрываем по клику вне окна
const onOutSideSuccessClick = (evt) => {
  const successPopup = document.querySelector('.success__inner');
  if (evt.target !== successPopup) {
    closeSuccessPopup();
  }
};

//показываем сообщение об успешной отправке
const showSuccessSendData = () => {
  const messageTemp = messageSuccess.cloneNode(true);
  messageTemp.querySelector('.success__button').addEventListener('click', closeSuccessPopup);
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  document.addEventListener('click', onOutSideSuccessClick, { once: true });
  document.body.append(messageTemp);
};


function onDocumentKeydownSuccess(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
}

export { showErrorGetData, showSuccessSendData, showErrorSendData };
