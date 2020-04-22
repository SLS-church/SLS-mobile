import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import React from 'react';
import { HomePage, Youtube, QRCard } from '../screen';
import { Image } from 'react-native';
import images from '@/theme/images';
import styled from 'styled-components/native';
import { QRCODE_APPLY_URL } from '@/constant';
import colors from '@/theme/colors';

const Tab = createBottomTabNavigator();

const Text = styled.Text`
  font-size: 12px;
`

enum TabName {
  HomePage = "Hompage",
  Youtube = "Youtube",
  QRCard = "QRCard"
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
        tabBarLabel: ({ focused, color }) => {
          let label = route.name;
          switch (route.name) {
            case TabName.HomePage:
              label = "홈페이지";
              break;
            case TabName.Youtube:
              label = "유튜브";
              break;
            case TabName.QRCard:
              label = "교인QR카드";
              break;
            default:
          }
          return (<Text style={{ color: focused ? color : colors.gray }}>{label}</Text>)
        },
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
      <Tab.Screen name={TabName.QRCard} component={QRCard} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
