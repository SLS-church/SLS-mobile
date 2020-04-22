
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

export type RootStackParamList = {
  MainTabNavigator: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'MainTabNavigator'
  > = StackNavigationProp<RootStackParamList, T>;

function RootNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="MainTabNavigator">
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
