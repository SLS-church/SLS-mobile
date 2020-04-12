import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import React from 'react';
import { HomePage, Youtube } from '../screen';
import { Image } from 'react-native';
import images from '@/theme/images';

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  HomePage: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'HomePage'
> = BottomTabNavigationProp<RootStackParamList, T>;

function RootNavigator(): React.ReactElement {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomePage') {
            return (
              <Image
                source={images.SLS}
                style={{ width: size, height: size }}
              />
            );
          } else if (route.name === 'Youtube') {
            return <Ionicons name="logo-youtube" size={size} color={color} />;
          }

          // You can return any component that you like here!
        },
      })}
      initialRouteName="HomePage">
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="Youtube" component={Youtube} />
    </Tab.Navigator>
  );
}

export default RootNavigator;
