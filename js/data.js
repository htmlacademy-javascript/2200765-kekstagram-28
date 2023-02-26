import {getRandomInteger, createIdGenerator} from './util.js';

//массив случайных описаний фотографии
const DESCRIPTION_PHOTOS = [
  'Пляж',
  'Море',
  'Пальма',
  'Яхта',
];

//массив случайных комментариев
const TEXT_COMMENTS = [
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

//переменные для генерации id
const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

//создание комментария
const createCommentsForPhoto = function () {
  const commentId = generateCommentId();
  const randomIdIndexAvatar = getRandomInteger(1, 6);
  const randomIdIndexComment = getRandomInteger(0, TEXT_COMMENTS.length - 1);
  const randomIdIndexNames = getRandomInteger(0, NAME_COMMENTATORS.length - 1);

  return {
    id: commentId,
    avatar: `img/avatar-${ randomIdIndexAvatar }.svg`,
    message: TEXT_COMMENTS[randomIdIndexComment],
    name: NAME_COMMENTATORS[randomIdIndexNames],
  };
};

//создание описания фотографии
const createDescriptionPhoto = function () {
  const photoId = generatePhotoId();
  const randomLikesIndex = getRandomInteger(15, 200);
  const randomDescriptionIndex = getRandomInteger(0, DESCRIPTION_PHOTOS.length - 1);
  const randomComment = createCommentsForPhoto();

  return {
    id: photoId,
    url: `photos/${ photoId }.jpg`,
    description: DESCRIPTION_PHOTOS[randomDescriptionIndex],
    likes: randomLikesIndex,
    comments: randomComment,
  };
};

const createDescriptionAllPhoto = Array.from({length: COUNT_PHOTO}, createDescriptionPhoto);

export {createDescriptionAllPhoto};
