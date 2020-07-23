import fs from 'fs';

// eslint-disable-next-line import/prefer-default-export
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
