import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';
import WebView from 'react-native-webview';
import colors from '@/theme/colors';
import { useNavigation } from '@react-navigation/core';
import { MainTabNavigationProps } from '../navigation/MainTabNavigator';
import { ActivityIndicator, Alert, View } from 'react-native';
import { QRCARD_URL, QRCODE_APPLY_URL, STORAGE_KEY_QRCODE_ID } from '@/constant';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 15px;
  background-color: ${colors.white};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TextContent = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const TextLabel = styled(TextContent)`
`;

const TextExample = styled.Text`
  font-size: 18px;
`;

const TextButton = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.azure};
`;

const InputButton = styled.TouchableOpacity`
  min-width: 50px;
  justify-content: center;
  align-items: center;
  border-color: ${colors.lightBlue};
  border-width: 1px;
  border-radius: 4px;
  padding: 5px 10px;
`;

const TextInput = styled.TextInput`
  font-size: 20px;
  flex: 1;
  height: 40px;
  border-color: gray;
  border-width: 1px;
  border-radius: 4px;
  padding: 4px;
`;

interface Props {
  route: {
    params: {
      id: string
    }
  }
}

async function getQrcodeId(): Promise<string | undefined> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY_QRCODE_ID)
    if (value !== null) {
      return value;
    }
    return undefined;
  } catch (e) {
    // error reading value
    Alert.alert('저장된 출입정보를 불러오는데 문제가 발생했습니다');
    return undefined;
  }
}

async function saveQrcodeId(id: string): Promise<void> {
  try {
    const value = await AsyncStorage.setItem(STORAGE_KEY_QRCODE_ID, id);
    if (value !== null) {
      return value;
    }
    return undefined;
  } catch (e) {
    // error reading value
    Alert.alert('출입정보를 저장하는데 문제가 발생했습니다');
    return undefined;
  }
}

function QRCard({ route }: Props): React.ReactElement {
  const [qrcodeId, setQRCodeID] = React.useState<string>('');
  const [webviewVisible, setWebViewVisible] = React.useState<boolean>(false);
  const [resetting, setResetting] = React.useState<boolean>(true);
  const [inputID, setInputID] = React.useState<string>('');
  const navigation = useNavigation<MainTabNavigationProps>();

  const linkedID = route?.params?.id;

  const reload = () => {
    setResetting(true);
  };
  React.useEffect(() => {
    getQrcodeId()
      .then((savedID) => {
        if (savedID) {
          setQRCodeID(savedID);
        }

        if (linkedID != null) {
          if (savedID != null) {
            Alert.alert('기존에 저장된 출입카드정보가 있습니다. 대체하시겠습니까?', '', [
              {
                text: "확인", onPress: () => {
                  setQRCodeID(linkedID);
                }
              },
              { text: "취소" }
            ])
          } else {
            setQRCodeID(linkedID);
          }
        }
      });
  }, [linkedID])

  React.useEffect(() => {
    navigation.addListener('tabPress', () => {
      // Prevent default behavior
      reload();
    });
  }, [navigation]);

  React.useEffect(() => {
    if (resetting) {
      setResetting(false);
      if (!qrcodeId) {
        setWebViewVisible(false);
      }
    }
  }, [resetting]);

  React.useEffect(() => {
    if (qrcodeId && qrcodeId.length > 0) {
      if (!qrcodeId.match(/^\w+$/)) {
        Alert.alert('아이디를 확인해주세요');
        setQRCodeID('');
        return;
      }
      setWebViewVisible(true);
    }
    saveQrcodeId(qrcodeId);
  }, [qrcodeId])

  if (resetting) {
    return (<></>)
  }
  return (
    <Container>
      {
        webviewVisible ?
          <WebView
            style={{ flex: 1 }}
            startInLoadingState
            source={{ uri: qrcodeId ? (QRCARD_URL + qrcodeId) : QRCODE_APPLY_URL }}
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
                if (qrcodeId) {
                  Alert.alert('아이디를 확인해주세요');
                  setQRCodeID('');
                }
                setWebViewVisible(false);
              };
            }} /> :
          <>
            <Row>
              <TextLabel>교인QR카드 URL 입력</TextLabel>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <TextInput
                onChangeText={value => setInputID(value)}
                value={inputID}
                placeholder={"URL 전체를 복사해서 입력해주세요"} />
              <View style={{ width: 10 }} />
              <InputButton onPress={() => {
                const newID = inputID.substring(inputID.lastIndexOf('/') + 1);
                setQRCodeID(newID);
              }}>
                <TextButton >확인</TextButton>
              </InputButton>
            </Row>
            <Row>
              <TextExample>입력 예) https://qrjoin.sls.or.kr/basic/person-card/00000 </TextExample>
            </Row>
            <Row />
            <TextLabel style={{ fontSize: 20, fontWeight: '500' }}>교인QR카드 정보가 입력되지 않았습니다.</TextLabel>
            <Row style={{ marginTop: 0 }}>
              <TextLabel>교인QR카드 발급</TextLabel>
              <InputButton onPress={() => {
                Alert.alert('출입증 QR코드 발급요청',
                  '출입증 QR코드 발급요청을 이미 하신 경우 다시 요청하실 필요가 없습니다. 출입증 발급 요청을 하시겠습니까?', [
                  {
                    text: '확인', onPress: () => setWebViewVisible(true)
                  },
                  {
                    text: '취소'
                  }
                ])
              }}>
                <TextButton >신청</TextButton>
              </InputButton>
            </Row>
          </>
      }
      {
        qrcodeId && qrcodeId.length > 0 ?
          <Row style={{ alignSelf: 'flex-end' }}>
            <InputButton
              onPress={() => {
                Alert.alert('정말로 삭제합니까?', '', [
                  {
                    text: '확인', onPress: () => {
                      AsyncStorage.removeItem(STORAGE_KEY_QRCODE_ID)
                        .then(() => setQRCodeID(''))
                        .then(() => setResetting(true));
                    }
                  },
                  { text: '취소' }
                ])
              }}>
              <TextButton >출입카드삭제</TextButton>
            </InputButton>
          </Row> :
          null
      }
    </Container>
  )
}

export default QRCard;
