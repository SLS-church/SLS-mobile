import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import React from 'react';
import { HomePage, Youtube, Profile } from '../screen';
import { Image } from 'react-native';
import images from '@/theme/images';

const Tab = createBottomTabNavigator();

enum TabName {
  HomePage = "홈페이지",
  Youtube = "유튜브",
  QRCard = "교인QR카드"
}

export type MainTabParamList = {
  [TabName.HomePage]: undefined;
  [TabName.Youtube]: undefined;
  [TabName.QRCard]: undefined;
};

export type MainTabNavigationProps<
  T extends keyof MainTabParamList = TabName.HomePage
  > = BottomTabNavigationProp<MainTabParamList, T>;

function MainTabNavigator(): React.ReactElement {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === TabName.HomePage) {
            return (
              <Image
                source={images.SLS}
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? undefined : 'gray',
                }}
              />
            );
          } else if (route.name === TabName.Youtube) {
            return <Ionicons name="logo-youtube" size={size} color={color} />;
          } else if (route.name === TabName.QRCard) {
            return <MaterialIcons name="qrcode" size={size} color={color} />;
          }

          // You can return any component that you like here!
        },
      })}
      initialRouteName={TabName.HomePage}>
      <Tab.Screen name={TabName.HomePage} component={HomePage} />
      <Tab.Screen name={TabName.Youtube} component={Youtube} />
      <Tab.Screen name={TabName.QRCard} component={Profile} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
