import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';

function Youtube(): React.ReactElement {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: 'https://www.youtube.com/channel/UCdysNhgE7XTGuMXaBBg41bA',
        }}
      />
    </SafeAreaView>
  );
}

export default Youtube;
