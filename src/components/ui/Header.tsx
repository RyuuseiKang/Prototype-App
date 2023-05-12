import React from 'react';
import styled from 'styled-components/native';
import {PSB20} from './Typo';
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'assets/icons/close.svg';

const Container = styled.View`
  width: 100%;
  padding: 20px;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled.TouchableOpacity``;

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  const navigation = useNavigation();
  return (
    <Container>
      <PSB20>{title}</PSB20>
      <BackButton
        hitSlop={{
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <BackIcon />
      </BackButton>
    </Container>
  );
};

export default Header;
