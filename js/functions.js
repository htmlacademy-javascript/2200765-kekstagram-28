function checkedLength (a, b) {
  return (a.length > b) ? 'Строка проходит по длине' : 'Строка не проходит по длине';
}
checkedLength('Some string', 4);

function checkedPolindrom (string) {
  for (let i = 0; i < string.length; i++) {
    return (string[i] === string[string.length - 1]) ? 'Это слово полиндром' : 'Это слово не полиндром';
  }
}
checkedPolindrom ('довод');

function chckedForNumber (string) {
  const allSymbol = string.replaceAll(' ', '');
  let onlynumbers = '';
  for (let i = 0; i < allSymbol.length; i++) {
    if (Number(allSymbol[i])) {
      onlynumbers += allSymbol[i];
    }
  }
  return onlynumbers;
}
chckedForNumber('3v cs267');

function checkedAll (originalString, minLength, addSymbol) {
  //Если исходная строка превышает заданную длину, она не должна обрезаться
  if (originalString.length >= minLength) {
    return originalString;
  }
  //Символы добавляются в начало строки, до заданной длинны
  for (let i = originalString.length; i < minLength; i++) {
    originalString = addSymbol + originalString;
  }
  return originalString;
}
checkedAll('12', 5, '0');
