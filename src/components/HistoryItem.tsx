import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {PR11, PR15, PB16, PSB12} from 'components/ui/Typo';
import moment from 'moment';
import Spacer from 'components/ui/Spacer';
import {AddPoints} from 'utils/Points';

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 15px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TimeText = styled(PR11)`
  color: #8e8e93;
`;

const StoreText = styled(PR15)`
  color: #000000;
`;

const ValueContainer = styled.View`
  align-items: flex-end;
`;

const TypeText = styled(PSB12)`
  color: #8e8e93;
`;

interface HistoryItemProps {
  date: Date;
  store: string;
  value: number;
  type: 'rent' | 'return';
  days?: number;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  date,
  store,
  value,
  type,
  days = 0,
}) => {
  return (
    <Container>
      <View>
        <TimeText>{moment(date).format('YYYY.MM.DD(dd) hh:mm')}</TimeText>
        <Spacer height={5} />
        <StoreText>{store}</StoreText>
      </View>
      <ValueContainer>
        <TypeText>
          {type === 'rent' ? (days === 0 ? '구매' : `${days}일 대여`) : '반납'}
        </TypeText>
        <Spacer height={5} />
        <PB16>
          {AddPoints(value)}
          {`${type === 'rent' ? '원' : 'P'}`}
        </PB16>
      </ValueContainer>
    </Container>
  );
};

export default HistoryItem;
