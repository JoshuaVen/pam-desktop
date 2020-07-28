/* eslint-disable import/prefer-default-export */
import fs from 'fs';

/**
 *
 * Returns a list of anime directories currently found
 * in the local machine.
 *
 */
export const local = () => {
  const source = 'E:/';
  // eslint-disable-next-line prefer-const
  let localList = [];
  // eslint-disable-next-line array-callback-return
  fs.readdirSync(source).map((name) => {
    if (
      !name.includes('.')
      && !name.includes('System Volume Information')
      && !name.includes('Android')
      && !name.includes('Images')
      && !name.includes('Movies')
      && !name.includes('Music')) {
      localList.push(name);
    }
  });
  return localList;
};
