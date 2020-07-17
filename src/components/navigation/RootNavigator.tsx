
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import MainTabNavigator from './MainTabNavigator';
import { BackHandler } from 'react-native';
import { useSnackbarContext } from '@dooboo-ui/snackbar';

const Stack = createStackNavigator();

export type RootStackParamList = {
  MainTabNavigator: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'MainTabNavigator'
  > = StackNavigationProp<RootStackParamList, T>;

function RootNavigator(): React.ReactElement {
  const [backPressTime, setBackPressTime] = React.useState(0);

  const snackbarContext = useSnackbarContext();
  const onBackPress = () => {
    const now = Date.now();
    if (now - backPressTime < 1000) {
      return false;
    }
    setBackPressTime(now);
    snackbarContext.show({
      text: '앱을 종료하시려면 뒤로가기 버튼을 한 번 더 누르세요.',
      containerStyle: {
        backgroundColor: '#00000080'
      },
      timer: 1000,
    })
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [backPressTime])
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
