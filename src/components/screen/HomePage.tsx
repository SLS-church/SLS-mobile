import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';

function HomePage(): React.ReactElement {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: 'http://m.sls.or.kr/' }} />
    </SafeAreaView>
  );
}

export default HomePage;
