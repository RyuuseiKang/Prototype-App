import React, { Ref, useMemo } from "react";
import BottomSheet, {BottomSheetHandleProps} from '@gorhom/bottom-sheet';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

import CloseIcon from 'assets/icons/close.svg';

const Container = styled(Animated.View)`
  position: absolute;
  width: 100%;
  top: -60px;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 30px;
  background-color: #fff;
`;

interface HandleProps extends BottomSheetHandleProps {
  style?: StyleProp<ViewStyle>;
  bottomSheetRef: Ref<BottomSheet>;
}

const BottomSheetHandle: React.FC<HandleProps> = ({style, animatedIndex, bottomSheetRef}) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    ),
    display: animatedIndex.value === 0 ? 'none' : 'flex',
  }));

  return (
    <Container
      style={[style, containerAnimatedStyle]}
      renderToHardwareTextureAndroid={true}>
      <BackButton
        onPress={() => {
          bottomSheetRef.current?.snapToIndex(0);
        }}>
        <CloseIcon />
      </BackButton>
    </Container>
  );
};

export default BottomSheetHandle;
