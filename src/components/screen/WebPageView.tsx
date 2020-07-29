import React, { useEffect, useState, useRef } from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { SafeAreaView, ActivityIndicator, BackHandler } from 'react-native';
import { MainTabNavigationProps } from '../navigation/MainTabNavigator';
import { useFocusEffect } from '@react-navigation/native';
import { PropsWithParams } from '@/util';

interface Params {
  baseUrl: string;
}

interface Props extends PropsWithParams<Params>{
  navigation: MainTabNavigationProps;
}

function WebPageView(props: Props): React.ReactElement {
  const { route: { params }, navigation } = props;
  const { baseUrl } = params;
  const [resetting, setResetting] = useState<boolean>(true);
  const webView = useRef<WebView>(null);

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
  const [navState, setNavState] = useState<WebViewNavigation | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navState && navState.canGoBack) {
          webView && webView.current?.goBack();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navState])
  );


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {
        resetting
          ?
          <></>
          :
          <WebView
            ref={webView}
            startInLoadingState
            renderLoading={() =>
              <ActivityIndicator
                style={{ position: 'absolute', top: 200, alignSelf: 'center' }}
                size="large"
                color="#0000ff" />
            }
            onNavigationStateChange={state => setNavState(state)}
            allowsFullscreenVideo
            mixedContentMode="always"
            onError={syntheticEvent => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
            }}
            source={{ uri: baseUrl }} />
      }
    </SafeAreaView>
  );
}

export default WebPageView;
