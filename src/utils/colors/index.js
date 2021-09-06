const mainColors = {
  green1: '#5DB075',
  green2: '#0BCAD4',
  green3: '#48FF1B',
  black1: '#000000',
  black2: 'rgba(0,0,0,0.5)',
  black3: '#524040',
  red1: '#e06379',
  red2: '#FF1B1B',
  white1: '#F6F6F6',
  white2: '#E8E8E8',
  grey1: '#BDBDBD',
};

export const colors = {
  primary: mainColors.green1,
  secondary: mainColors.dark1,
  white: 'white',
  black: 'black',
  disable: mainColors.green2,
  text: {
    primary: mainColors.green1,
    secondary: mainColors.dark1,
  },
  button: {
    primary: {
      background: mainColors.green1,
      text: 'white',
    },
    secondary: {
      background: 'white',
      text: mainColors.black3,
    },
    disable: {
      background: mainColors.green2,
      text: mainColors.black3,
    },
  },
  header: {
    primary: {
      background: mainColors.white1,
      text: mainColors.black3,
    },
  },
  list: {
    name: mainColors.grey1,
    desc: mainColors.black3,
  },
  input: mainColors.white1,
  border: mainColors.white2,
  cardLight: mainColors.green2,
  loadingBackground: mainColors.black2,
  error: mainColors.red1,
  lunas: mainColors.green3,
  belumLunas: mainColors.red2,
};
