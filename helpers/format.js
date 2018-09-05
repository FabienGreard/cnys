const format = (string, number) => {
  const isShort = number - string.length >= 0;

  if (isShort) {
    string = string + ' '.repeat(number - string.length);
  } else {
    try {
      string = string
        .split('/')
        .reduce((ac, cv, i) => {
          return [
            ...ac,
            i > 1 && i < string.split('/').length - 2 ? '...' : cv
          ];
        }, [])
        .join('/');
    } catch (e) {}

    string =
      number - string.length >= 0
        ? string + ' '.repeat(number - string.length)
        : string.slice(0, number);
  }

  return string;
};

module.exports = format;
