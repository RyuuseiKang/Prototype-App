import React from 'react';
import styled from 'styled-components/native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from 'components/ui/Header';
import {
  Alert,
  Dimensions,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';

import CardImage from 'assets/ui/gs-card.png';
import {PB26, PSB14} from 'components/ui/Typo';
import Spacer from 'components/ui/Spacer';
import {SplitCard} from '../utils/Points';
import {useNavigation} from '@react-navigation/native';

const Container = styled.View<{insets: EdgeInsets}>`
  padding-top: ${({insets}) => insets.top};

  flex: 1;
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

const CardImageContainer = styled.ImageBackground`
  border-radius: 15px;
  overflow: hidden;
  border-color: #8e8e93;
  border-width: 1px;

  justify-content: flex-end;
`;

const CardNumberText = styled(PB26)`
  color: #fff;

  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.7;
  shadow-radius: 3px;

  bottom: 45px;
  left: 25px;
`;

const CardInputContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const CardInput = styled.TextInput`
  flex: 1;
  border-radius: 8px;
  border-color: #8e8e93;
  border-width: 1px;
  padding: 15px;
  font-size: 16px;
  font-family: 'Pretendard-Medium';
`;

const RegistCardButton = styled.TouchableOpacity`
  background-color: #52a6dd;
  border-radius: 100px;
  flex: 1;
  padding: 12px;
  width: 100%;

  align-items: center;
`;

const RegistCardButtonText = styled(PSB14)`
  color: #fff;
`;

const CardPage: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [cardNumber, setCardNumber] = React.useState<string>('');

  const windowWidth = Dimensions.get('window').width - 40;

  const generateCardNumber = (_cardNumber: string) => {
    var mark = "";
    for (var i = 0; i < 16 - _cardNumber.length; i++) {
      mark += '*';
    }

    return _cardNumber + mark;
  };

  return (
    <Container insets={insets}>
      <Header title={'GS&POINT 카드 등록'} />
      <Scroll
        contentContainerStyle={{
          alignItems: 'center',
          padding: 20,
        }}>
        <CardImageContainer
          source={CardImage}
          style={{width: windowWidth, height: windowWidth / 1.64}}>
          <CardNumberText>
            {SplitCard(generateCardNumber(cardNumber))}
          </CardNumberText>
        </CardImageContainer>
        <Spacer height={20} />
        <CardInputContainer>
          <PSB14>카드번호</PSB14>
          <Spacer height={10} />
          <CardInput
            maxLength={16}
            placeholder={'카드번호를 입력해주세요.'}
            placeholderTextColor={'#8e8e93'}
            keyboardType={'number-pad'}
            onChangeText={e => {
              setCardNumber(e);
            }}
            value={cardNumber}
          />
        </CardInputContainer>

        <Spacer height={40} />
        <RegistCardButton
          onPress={() => {
            if (cardNumber.length !== 16) {
              Alert.alert('카드번호를 확인해주세요.');
            } else {
              Alert.alert('카드 등록이 완료되었습니다.');
              setTimeout(() => {
                navigation.goBack();
              }, 300);
            }
          }}>
          <RegistCardButtonText>카드 등록하기</RegistCardButtonText>
        </RegistCardButton>
      </Scroll>
    </Container>
  );
};

export default CardPage;
