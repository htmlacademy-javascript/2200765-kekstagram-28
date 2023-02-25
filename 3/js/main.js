//массив случайных описаний фотографии
const DESCRIPTION_PHOTO = [
  'Пляж',
  'Море',
  'Пальма',
  'Яхта',
];

//массив случайных комментариев
const TEXT_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

//массив случайных имен комментаторов
const NAME_COMMENTATORS = [
  'Владимир',
  'Сергей',
  'Виктор',
  'Анастасия',
  'Олеся',
];

const COUNT_PHOTO = 25;

// получение случайных чисел
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

//генератор уникальных идентификаторов
function createIdGenerator() {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

//переменные для генерации id
const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

//создание комментария
const createCommentsPhoto = function () {
  const CommentId = generateCommentId();
  const randomIdIndexAvatar = getRandomInteger(1, 6);
  const randomIdIndexComment = getRandomInteger(0, TEXT_COMMENT.length - 1);
  const randomIdIndexNames = getRandomInteger(0, NAME_COMMENTATORS.length - 1);

  return {
    id: CommentId,
    avatar: `img/avatar-${ randomIdIndexAvatar }.svg`,
    message: TEXT_COMMENT[randomIdIndexComment],
    name: NAME_COMMENTATORS[randomIdIndexNames],
  };
};

//создание описания фотографии
const createDescriptionPhoto = function () {
  const PhotoId = generatePhotoId();
  const randomLikesIndex = getRandomInteger(15, 200);
  const randomDescriptionIndex = getRandomInteger(0, DESCRIPTION_PHOTO.length - 1);
  const randomComment = createCommentsPhoto();

  return {
    id: PhotoId,
    url: `photos/${ PhotoId }.jpg`,
    description: DESCRIPTION_PHOTO[randomDescriptionIndex],
    likes: randomLikesIndex,
    comments: randomComment,
  };
};

const createAllDescription = Array.from({length: COUNT_PHOTO}, createDescriptionPhoto);

// eslint-disable-next-line no-console
console.log(createAllDescription);
