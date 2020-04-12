import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import React from 'react';
import { HomePage, Youtube } from '../screen';

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  HomePage: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'HomePage'
> = BottomTabNavigationProp<RootStackParamList, T>;

function RootNavigator(): React.ReactElement {
  return (
    <Tab.Navigator initialRouteName="HomePage">
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="Youtube" component={Youtube} />
    </Tab.Navigator>
  );
}

export default RootNavigator;
