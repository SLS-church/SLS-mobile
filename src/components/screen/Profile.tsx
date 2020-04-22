import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import WebView from 'react-native-webview';
import colors from '@/theme/colors';
import { useNavigation } from '@react-navigation/core';
import { MainTabNavigationProps } from '../navigation/MainTabNavigator';
import { ActivityIndicator, Alert } from 'react-native';

const qrcardUrl = 'https://qrjoin.sls.or.kr/basic/person-card/'
const qrcodeApplyUrl = 'https://qrjoin.sls.or.kr/basic/apply'

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TextLabel = styled.Text`
  font-size: 16px;
  margin-left: 15px;
`;

const TextContent = styled(TextLabel)`
`;

const InputButton = styled.TouchableOpacity`
  min-width: 100px;
  justify-content: center;
`;

const QRContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

function Profile(): React.ReactElement {
  const [qrcodeId, setQRCodeID] = React.useState<string>('');
  const [webviewVisible, setWebViewVisible] = React.useState<boolean>(false);
  const [resetting, setResetting] = React.useState<boolean>(true);
  const navigation = useNavigation<MainTabNavigationProps>();

  const reload = () => {
    setResetting(true);
  };
  React.useEffect(() => {
    navigation.addListener('tabPress', () => {
      // Prevent default behavior
      reload();
    });
  }, [navigation]);
  React.useEffect(() => {
    if (resetting) {
      setResetting(false);
    }
  }, [resetting]);

  if (resetting) {
    return (<></>)
  }
  return (
    <Container>
      {
        webviewVisible ?
          <WebView
            style={{ flex: 1 }}
            source={{ uri: qrcodeId ? (qrcardUrl + qrcodeId) : qrcodeApplyUrl }}
            renderLoading={() =>
              <ActivityIndicator
                style={{ position: 'absolute', top: 200, alignSelf: 'center' }}
                size="large"
                color="#0000ff" />
            }
            onNavigationStateChange={(newNavState) => {
              const { url } = newNavState;
              if (!url) return;
              if (!url.includes('qrjoin.sls.or.kr')) {
                setWebViewVisible(false);
              }
            }} /> :
          <>
            <TextLabel>출입증 정보가 입력되지 않았습니다.</TextLabel>
            <Row>
              <TextLabel>출입증 발급을 요청하시겠습니까?</TextLabel>
              <InputButton onPress={() => {
                Alert.alert('출입증 QR코드 발급요청', '출입증 QR코드 발급요청을 이미 하신 경우 다시 요청하실 필요가 없습니다. 출입증 발급 요청을 하시겠습니까?', [
                  {
                    text: '확인', onPress: () => setWebViewVisible(true)
                  },
                  {
                    text: '취소'
                  }
                ])
              }}>
                <TextContent style={{ color: colors.blue }}>확인</TextContent>
              </InputButton>
            </Row>
          </>
      }
    </Container>
  )
}

export default Profile;
