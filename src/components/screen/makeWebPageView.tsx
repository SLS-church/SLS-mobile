import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { MainTabNavigationProps } from '../navigation/MainTabNavigator';

interface Props {
  navigation: MainTabNavigationProps;
}

const makeWebPageView = (uri: string) => {
  function HomePage({ navigation }: Props): React.ReactElement {
    const [resetting, setResetting] = useState<boolean>(true);

    const reload = () => {
      setResetting(true);
    };
    useEffect(() => {
      navigation.addListener('tabPress', () => {
        // Prevent default behavior
        reload();
      });
    }, [navigation]);
    useEffect(() => {
      if (resetting) {
        setResetting(false);
      }
    }, [resetting]);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {
          resetting
            ?
            <></>
            :
            <WebView
              startInLoadingState
              renderLoading={() =>
                <ActivityIndicator
                  style={{ position: 'absolute', top: 200, alignSelf: 'center' }}
                  size="large"
                  color="#0000ff" />
              }
              allowsFullscreenVideo
              source={{ uri: uri }} />
        }
      </SafeAreaView>
    );
  }
  return HomePage;
};

export default makeWebPageView;
