import React, {useState, useEffect} from 'react';
import {Appearance, StatusBarStyle} from 'react-native';
import {DefaultTheme} from 'styled-components/native';
import {LightThemes, DarkThemes} from 'styles/Themes';
const useTheme: () => [DefaultTheme, StatusBarStyle] = () => {
  const [theme, setTheme] = useState<DefaultTheme>({...LightThemes});
  const [barStyle, setBarStyle] = useState<StatusBarStyle>('light-content');
  const [mode, setMode] = useState(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    setTheme(mode === 'light' ? {...LightThemes} : {...LightThemes});
    setBarStyle(mode === 'light' ? 'dark-content' : 'dark-content');
  }, [mode]);

  useEffect(() => {
    const updateMode = () => {
      const currentMode = Appearance.getColorScheme();
      setMode(currentMode === 'dark' ? 'dark' : 'light');
    };

    Appearance.addChangeListener(updateMode);
  }, []);

  return [theme, barStyle];
};

export default useTheme;
