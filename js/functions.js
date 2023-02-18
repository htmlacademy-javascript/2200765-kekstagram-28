function checkedLenght (a, b) {
  return (a.length > b) ? 'Строка проходит по длине' : 'Строка не проходит по длине';
}
checkedLenght('Some string', 4);

function checkedPolindrom (string) {
  for (let i = 0; i < string.length; i++) {
    return (string[i] === string[string.length - 1]) ? 'Это слово полиндром' : 'Это слово не полиндром';
  }
}
checkedPolindrom ('довод');

