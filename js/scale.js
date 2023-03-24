
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
const fieldScale = document.querySelector('.scale__control--value');
//шаблонное фото
const imagePreview = document.querySelector('.img-upload__preview img');

//преобразуем значение в число
const getScaleValue = () => parseInt(fieldScale.value, 10);

//изменение масштаба фото
const changeScalePhoto = () => {
  imagePreview.style.transform = `scale(${getScaleValue() / 100})`;
};

//уменьшение масштаба
const reduceScale = () => {
  fieldScale.value = `${getScaleValue() - STEP_SCALE}%`;
};

function onButtonSmaller() {
  if (getScaleValue() > MIN_SCALE) {
    reduceScale();
    changeScalePhoto();
  }
}

buttonSmaller.addEventListener('click', onButtonSmaller);

//увеличение масштаба
const increaseScale = () => {
  fieldScale.value = `${getScaleValue() + STEP_SCALE}%`;
};

function onButtonBigger(evt) {
  evt.preventDefault();

  if (getScaleValue() < MAX_SCALE) {
    increaseScale();
    changeScalePhoto();
  }
}

buttonBigger.addEventListener('click', onButtonBigger);
