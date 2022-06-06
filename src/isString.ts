const isString = (string: string): boolean => {
  if (typeof string !== 'string') {
    return false;
  }

  return string.split('').every((char) => {
    if (typeof char !== 'string') {
      return false;
    }

    return Boolean(/^[a-zA-Z]+$/.test(char));
  });
};

export default isString;
