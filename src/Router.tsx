import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import MainPage from 'pages/MainPage';
import ReturnPage from 'pages/ReturnPage';
import CardPage from 'pages/CardPage';

export type MainParamList = {
  Map: undefined;
};

export type ReturnParamList = {};

export type CardParamList = {};

type RootStackParamList = {
  Main: NavigatorScreenParams<MainParamList>;
  Return: NavigatorScreenParams<ReturnParamList>;
  Card: NavigatorScreenParams<CardParamList>;
};

const Router: React.FC = () => {
  const navigationRef = createNavigationContainerRef<RootStackParamList>();
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator initialRouteName={'Main'}>
        <RootStack.Screen
          name="Main"
          component={MainPage}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Return"
          component={ReturnPage}
          options={{
            gestureEnabled: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Card"
          component={CardPage}
          options={{
            gestureEnabled: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
