import React, { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';

const HOME_PAGE_URI = 'http://m.sls.or.kr/';

function HomePage({ navigation }): React.ReactElement {
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
      {resetting ? <></> : <WebView source={{ uri: HOME_PAGE_URI }} />}
    </SafeAreaView>
  );
}

export default HomePage;
