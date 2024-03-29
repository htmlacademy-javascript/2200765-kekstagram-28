//допустимые типы файлов
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

//поле загрузки картинки
const fileChooser = document.querySelector('.img-upload__input');
//место куда нужно вставить картинку
const preview = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((value) => fileName.endsWith(value));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});
