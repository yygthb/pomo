export const stringToBool = str => str === 'false' ? false : str === 'true' ? true : Error('converted value error');
