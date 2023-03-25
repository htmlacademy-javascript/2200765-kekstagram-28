//фильтры с настройками
const FILTER_EFFECTS = {
  none: { filter: 'none', min: 0, max: 100, step: 1, unit: '', },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '', },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''},
};

//картинка
const fullPhotoElement = document.querySelector('.img-upload__preview img');
//контейнер со слайдером
const sliderContainer = document.querySelector('.img-upload__effect-level');
//слайдер
const sliderElement = document.querySelector('.effect-level__slider');
//список эффектов
const effectsListElement = document.querySelector('.effects__list');
//значение слайдера, уровень эффекта
const valueSlider = document.querySelector('.effect-level__value');

//показываем слайдер при выборе фильтра
const showSlider = (effect) => {
  if (effect) {
    sliderContainer.classList.remove('hidden');
  } else {
    sliderContainer.classList.add('hidden');
  }
};

//удаляем слайдер при оригинале
const deleteSlider = () => {
  fullPhotoElement.style = null;
  fullPhotoElement.className = '';
  showSlider(false);
};

//создаем слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: FILTER_EFFECTS.none.min,
    max: FILTER_EFFECTS.none.max
  },
  start: FILTER_EFFECTS.none.max,
  step: FILTER_EFFECTS.none.step,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

//удаляем слайдер
showSlider(false);

//обновляем слайдер
const updateEffectSlider = (selectedEffect) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: FILTER_EFFECTS[selectedEffect].min,
      max: FILTER_EFFECTS[selectedEffect].max
    },
    start: FILTER_EFFECTS[selectedEffect].max,
    step: FILTER_EFFECTS[selectedEffect].step,
    connect: 'lower',
  });
  //привязываем событие на слайдер
  sliderElement.noUiSlider.on('update', () => {
    //актуальное значение слайдера
    const effectValue = sliderElement.noUiSlider.get();
    //для передачи на сервер актуального значения
    valueSlider.value = effectValue;
    //применяем выбранный фильтр к фото
    fullPhotoElement.style.filter = `${FILTER_EFFECTS[selectedEffect].filter}(${effectValue + FILTER_EFFECTS[selectedEffect].unit})`;
    //убирем фильтр для оригинала
    if (FILTER_EFFECTS[selectedEffect].filter === 'none') {
      fullPhotoElement.style = null;
    }
  });
};

//обработчик на выбор фильтра
const changeEffect = (evt) => {
  const selectedFilter = evt.target.value;
  if (selectedFilter === 'none') {
    deleteSlider();
  } else {
    showSlider(true);
    fullPhotoElement.classList.add(`effects__preview--${selectedFilter}`);
  }
  updateEffectSlider(selectedFilter);
};

effectsListElement.addEventListener('change', changeEffect);
