import {PixelRatio} from 'react-native';

const fontScale = PixelRatio.getFontScale();

const ColorBase = {
  WHITE: '#FDFDFD',
  BLACK: '#333333',
};

export const LightThemes = {
  colors: {
    ...ColorBase,
    TEXT: ColorBase.BLACK,
    BACKGROUND: ColorBase.WHITE,
  },
  fonts: {
    fontFamily: 'Pretendard-Regular',
    fontScale: fontScale,
  },
};

export const DarkThemes = {
  colors: {
    ...ColorBase,
    TEXT: ColorBase.WHITE,
    BACKGROUND: ColorBase.BLACK,
  },
  fonts: {
    fontFamily: 'Pretendard-Regular',
    fontScale: fontScale,
  },
};

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: typeof LightThemes.colors;
    // fonts: typeof LightThemes.fonts;
  }
}
