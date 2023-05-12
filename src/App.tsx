import React from 'react';
import {StatusBar, Text} from 'react-native';

import {ThemeProvider} from 'styled-components';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import 'moment/locale/ko';

import useTheme from 'hooks/ui/useTheme';

import Router from './Router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

(Text as any).defaultProps = {
  ...(Text as any).defaultProps,
  allowFontScaling: false,
};

const App: React.FC = () => {
  const [theme, barStyle] = useTheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <StatusBar
              barStyle={barStyle}
              backgroundColor={'transparent'}
              translucent={true}
              animated={true}
            />
            <Router />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
