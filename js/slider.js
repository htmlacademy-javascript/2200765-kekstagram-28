//параметры фильтров
const FILTER_EFFECTS = {
  none: { filter: 'none', min: 0, max: 100, step: 1, unit: '', },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '', },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''},
};

//загруженная картинка
const uploadPhoto = document.querySelector('.img-upload__preview img');
//контейнер со слайдером
const sliderContainer = document.querySelector('.img-upload__effect-level');
//слайдер
const effectSlider = document.querySelector('.effect-level__slider');
//список эффектов
const effectsList = document.querySelector('.effects__list');
//значение слайдера
const effectInput = document.querySelector('.effect-level__value');

//показываем слайдер при выборе фильтра
const showSlider = (selectedEffect) => {
  if (selectedEffect) {
    sliderContainer.classList.remove('hidden');
  } else {
    sliderContainer.classList.add('hidden');
  }
};

//удаляем слайдер при оригинале
const deleteSlider = () => {
  uploadPhoto.style = null;
  uploadPhoto.className = '';
  showSlider(false);
};

//создаем слайдер
noUiSlider.create(effectSlider, {
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
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: FILTER_EFFECTS[selectedEffect].min,
      max: FILTER_EFFECTS[selectedEffect].max
    },
    start: FILTER_EFFECTS[selectedEffect].max,
    step: FILTER_EFFECTS[selectedEffect].step,
    connect: 'lower',
  });
  //привязываем событие на слайдер
  effectSlider.noUiSlider.on('update', () => {
    //актуальное значение слайдера
    const effectValue = effectSlider.noUiSlider.get();
    //для передачи на сервер актуального значения
    effectInput.value = effectValue;
    //применяем выбранный фильтр к фото
    uploadPhoto.style.filter = `${FILTER_EFFECTS[selectedEffect].filter}(${effectValue + FILTER_EFFECTS[selectedEffect].unit})`;
    //убирем фильтр для оригинала
    if (FILTER_EFFECTS[selectedEffect].filter === 'none') {
      uploadPhoto.style = null;
    }
  });
};

//обработчик на выбор фильтра
const onApplyEffectClick = (evt) => {
  const selectedFilter = evt.target.value;
  if (selectedFilter === 'none') {
    deleteSlider();
  } else {
    showSlider(true);
    uploadPhoto.classList.add(`effects__preview--${selectedFilter}`);
  }
  updateEffectSlider(selectedFilter);
};

effectsList.addEventListener('change', onApplyEffectClick);

export { deleteSlider };
