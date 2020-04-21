import React from 'react';
import styled from 'styled-components/native';
import QRCode from 'react-native-qrcode-svg';

const Container = styled.View`
  flex: 1;
  padding: 15px;
`;

const TextLabel = styled.Text`
  font-size: 16px;
  padding-right: 10px;
`;

const TextContent = styled.Text`
  font-size: 16px;
`;

const InputButton = styled.TouchableOpacity`
  min-width: 100px;
  min-height: 40px;
  justify-content: center;
`;

const TextInput = styled.TextInput`
  font-size: 16px;
  flex: 1;
  height: 40px;
  border-color: gray;
  border-width: 1px;
  border-radius: 4px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 15px 0px;
`;

const QRContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

enum InputState {
  Name,
  Contact,
  Null
}

function Profile(): React.ReactElement {
  const [name, setName] = React.useState<string>('');
  const [contact, setContact] = React.useState<string>('');
  const [inputState, setInputState] = React.useState<InputState>(InputState.Null);
  const [QRCodeView, setQRCodeView] = React.useState<React.ReactElement>(<></>);

  const generateQRCode = () => {
    setQRCodeView(
      <QRCode
        value={`이름:${name}, 연락처:${contact}`}
        size={200}
      />
    );
  }

  return (
    <Container>
      <Row>
        <TextLabel>이름 :</TextLabel>
        {
          inputState === InputState.Name
            ? <TextInput
              onSubmitEditing={() => setInputState(InputState.Null)}
              onChangeText={value => setName(value)}
              value={name} />
            : <InputButton
              onPress={() => setInputState(InputState.Name)}>
              {
                name.length > 0 ?
                  <TextContent>{name}</TextContent> :
                  <TextContent style={{ color: 'gray' }}>이름을 입력해주세요.</TextContent>
              }
            </InputButton>
        }
      </Row>
      <Row>
        <TextLabel>연락처 :</TextLabel>
        {
          inputState === InputState.Contact
            ? <TextInput
              onSubmitEditing={() => setInputState(InputState.Null)}
              onChangeText={value => setContact(value)}
              value={contact} />
            : <InputButton
              onPress={() => setInputState(InputState.Contact)}>
              {
                contact.length > 0 ?
                  <TextContent>{contact}</TextContent> :
                  <TextContent style={{ color: 'gray' }}>연락처를 입력해주세요.</TextContent>
              }
            </InputButton>
        }
      </Row>
      <Row>
        <TextLabel>QRCode</TextLabel>
        <InputButton
          onPress={() => generateQRCode()}>
          <TextContent>생성하기</TextContent>
        </InputButton>
      </Row>
      <QRContainer>
        {
          QRCodeView
        }
      </QRContainer>
    </Container>
  )
}

export default Profile;
