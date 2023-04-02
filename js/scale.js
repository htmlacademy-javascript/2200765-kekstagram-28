//шаг изменения масштаба
const STEP_SCALE = 25;
//максимальное значение
const MAX_SCALE = 100;
//минимальное значение
const MIN_SCALE = 25;

//кнопка уменьшения масштаба
const buttonSmaller = document.querySelector('.scale__control--smaller');
//кнопка увеличения масштаба
const buttonBigger = document.querySelector('.scale__control--bigger');
//поле с масштабом
const scaleInput = document.querySelector('.scale__control--value');
//загруженная картинка
const uploadPhoto = document.querySelector('.img-upload__preview img');

//преобразуем значение в число
const getScaleValue = () => parseInt(scaleInput.value, 10);

//изменение масштаба фото
const changeScalePhoto = () => {
  uploadPhoto.style.transform = `scale(${getScaleValue() / 100})`;
};

//уменьшение масштаба
const reduceScale = () => {
  scaleInput.value = `${getScaleValue() - STEP_SCALE}%`;
};

function onButtonSmallerClick () {
  if (getScaleValue() > MIN_SCALE) {
    reduceScale();
    changeScalePhoto();
  }
}

buttonSmaller.addEventListener('click', onButtonSmallerClick);

//увеличение масштаба
const increaseScale = () => {
  scaleInput.value = `${getScaleValue() + STEP_SCALE}%`;
};

function onButtonBiggerClick (evt) {
  evt.preventDefault();

  if (getScaleValue() < MAX_SCALE) {
    increaseScale();
    changeScalePhoto();
  }
}

buttonBigger.addEventListener('click', onButtonBiggerClick);
