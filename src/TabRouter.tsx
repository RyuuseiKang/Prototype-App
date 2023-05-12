import React from 'react';
import useTheme from 'hooks/ui/useTheme';

export type TabParamList = {
  Main: undefined;
};

const TabRouter: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const Tab = createBottomTabNavigator<TabParamList>();
  const [theme] = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.BACKGROUND,
          borderTopColor: theme.colors.BACKGROUND,
        },
        tabBarActiveTintColor: theme.colors.BLUE,
        tabBarInactiveTintColor: theme.colors.DISABLE,
        tabBarIconStyle: {},
      }}>
      <Tab.Screen name="Main" component={MainPage} />
    </Tab.Navigator>
  );
};

export default TabRouter;
