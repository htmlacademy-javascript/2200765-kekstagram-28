function checkLength (string, length) {
  return string.length > length;
}
checkLength('Some string', 4);

function checkPalindrom (string) {
  const modeString = string.toLowerCase().replaceAll(' ', '');
  let reverseString = '';
  for (let i = modeString.length - 1; i >= 0 ; i--) {
    reverseString = reverseString + modeString.at(i);
  }
  return reverseString === modeString;
}
checkPalindrom ('ДовОд');

function getNumber (string) {
  const allSymbol = string.replaceAll(' ', '');
  let onlyNumbers = '';
  for (let i = 0; i < allSymbol.length; i++) {
    if (!Number.isNaN(parseInt(allSymbol[i], 10))) {
      onlyNumbers += allSymbol[i];
    }
  }
  return parseInt(onlyNumbers, 10);
}
getNumber('3v cs267');

function checkString (originalString, minLength, addSymbol) {
  const difference = minLength - originalString.length;
  if (difference <= 0) {
    return originalString;
  }
  return addSymbol.slice(0, difference % addSymbol.length) + addSymbol.repeat(difference / addSymbol.length) + originalString;
}
checkString('12', 5, '0');
