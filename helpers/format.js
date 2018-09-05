const formatPath = (string, number) => {
  const isShort = number - string.length >= 0;

  if (isShort) {
    string = string + ' '.repeat(number - string.length);
  } else {
    string = string
      .split('/')
      .reduce((ac, cv, i) => {
        return [...ac, i > 1 && i < string.split('/').length - 2 ? '...' : cv];
      }, [])
      .join('/');

    string;

    string = string.slice(0, number);
  }

  return string;
};

const formatLog = (string, number) => {
  return String(string).slice(0, number);
};

module.exports = { formatPath, formatLog };
