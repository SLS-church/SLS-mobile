import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import React from 'react';
import HomePage from '@/components/screen/HomePage';

const Stack = createStackNavigator();

export type RootStackParamList = {
  HomePage: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'HomePage'
> = StackNavigationProp<RootStackParamList, T>;

function RootNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomePage" component={HomePage} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
