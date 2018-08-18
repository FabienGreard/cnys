const formatPath = (string, number) => {
  const _number = number - string.length;
  let _string = string;

  if (_number >= 0) {
    _string = _string.split('');
    _string.splice(string.length, 0, ' '.repeat(_number));
    _string = _string.join('');
  } else {
    try {
      _string = _string.split('/');

      for (let i = 3, length = 0; i < _string.length; i++) {
        length += _string[i].length;
        if (length + _number >= 0) {
          _string.splice(3, i, '...');
          _string = _string.join('/');
          break;
        }
      }
    } catch (e) {}
  }

  return _string;
};

const formatLog = (string, number) => {
  return String(string).slice(0, number);
};

module.exports = { formatPath, formatLog };
