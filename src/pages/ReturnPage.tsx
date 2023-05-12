import React from 'react';
import styled from 'styled-components/native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from 'components/ui/Header';
import {FlatList} from 'react-native';
import HistoryItem from 'components/HistoryItem';

const Container = styled.View<{insets: EdgeInsets}>`
  padding-top: ${({insets}) => insets.top};

  flex: 1;
`;

const ReturnPage: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container insets={insets}>
      <Header title={'대여 이력'} />
      <FlatList
        data={[
          {
            date: new Date(2023, 4, 11, 18, 25),
            store: 'GS25 지에스본점',
            type: 'return',
            value: 500,
          },
          {
            date: new Date(2023, 4, 11, 18, 9),
            store: 'GS25 지에스강남점',
            type: 'rent',
            value: 20000,
          },
          {
            date: new Date(2023, 4, 4, 18, 20),
            store: 'GS25 역삼사랑점',
            type: 'return',
            value: 104,
          },
          {
            date: new Date(2023, 4, 4, 8, 25),
            store: 'GS25 강남타운점',
            type: 'rent',
            value: 10400,
            days: 1,
          },
          {
            date: new Date(2023, 3, 28, 18, 31),
            store: 'GS25 대치삼호점',
            type: 'return',
            value: 130,
          },
          {
            date: new Date(2023, 3, 24, 8, 12),
            store: 'GS25 강남타운점',
            type: 'rent',
            value: 13000,
            days: 5,
          },
        ]}
        renderItem={({item}) => {
          return (
            <HistoryItem
              date={item.date}
              store={item.store}
              type={item.type}
              days={item.days}
              value={item.value}
            />
          );
        }}
      />
    </Container>
  );
};

export default ReturnPage;
