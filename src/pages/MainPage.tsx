import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import NaverMapView, {Marker} from 'react-native-nmap';
import BottomSheet, {
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';

import ClockIcon from 'assets/icons/clock.svg';
import gs25Logo from 'assets/icons/gs25-logo.png';
import bikeLogo from 'assets/icons/bike-logo.png';
import GSLogo from 'assets/icons/gs-logo.png';
import bottomSheetHeaderImageLeft from 'assets/ui/BottomSheetHeaderLeft.png';
import bottomSheetHeaderImageCenter from 'assets/ui/BottomSheetHeaderCenter.png';
import DummyStation from 'assets/map/dummy';
import BottomSheetBackdrop from 'components/ui/BottomSheetBackdrop';
import BottomSheetHandle from 'components/ui/BottomSheetHandle';
import Spacer from 'components/ui/Spacer';
import {PR12, PM13, PSB16, PB12} from 'components/ui/Typo';
import {useNavigation} from '@react-navigation/native';
import useLocationPermission from 'hooks/permissions/useLocationPermission';
import {AddPoints} from 'utils/Points';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {TrackingMode} from 'react-native-nmap/index';
import {StatusBar} from 'react-native';

const Container = styled.View`
  flex: 1;
`;

const MapContainer = styled(NaverMapView)`
  flex: 1;
`;

const MarkerImage = styled(Marker)`
  width: 40px;
  height: 40px;
`;

const BottomSheetContainer = styled(BottomSheet)`
  margin: 20px;
  border-radius: 10px;
  shadow-color: #333336;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
`;

const BottomSheetContent = styled.View`
  padding: 0px;
  overflow: hidden;
  border-radius: 15px;
`;

const BottomSheetHeaderContainer = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;

  height: 41px;
`;

const BottomSheetHeaderLeftImage = styled.ImageBackground`
  padding-top: 10px;
  height: 41px;
  width: 130px;
`;

const BottomSheetHeaderRightImage = styled.ImageBackground`
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 10px;
  height: 41px;
`;

const BottomSheetHeaderCenterImage = styled.Image`
  flex: 1;
  resize-mode: stretch;
  height: 41px;
`;

const GSLogoImage = styled.Image`
  width: 13px;
  height: 13px;
`;

const BottomSheetTitle = styled(PM13)`
  padding: 0px 20px;
`;

const QRContent = styled(Animated.View)`
  padding: 20px;
  align-items: center;
`;

const RemainTimeContainer = styled.View`
  flex-direction: row;
  padding: 8px 10px;
  background-color: #363638;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
`;

const RemainTimeText = styled(PM13)`
  color: #ffffff;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  background-color: #52a6dd;
  border-radius: 50px;
  padding: 12px;
  width: 100%;
  align-items: center;
`;

const ButtonText = styled(PSB16)`
  color: #ffffff;
`;

const TransparentButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  width: 100%;
  align-items: center;
`;

const TransparentButtonText = styled(PR12)`
  color: #363638;
`;

const MainPage: React.FC = () => {
  const navigation = useNavigation();
  const mapRef = useRef<NaverMapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const animatedBottomSheetIndex = useSharedValue<number>(0);

  const [
    isLocationPermissionGranted,
    currentLocation,
    requestLocationPermission,
    openLocationPermissionSetting,
  ] = useLocationPermission();

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints([insets.bottom + 50, 'CONTENT_HEIGHT']);

  useEffect(() => {
    if (!isLocationPermissionGranted) {
      requestLocationPermission();
    }

    mapRef.current?.setLocationTrackingMode(TrackingMode.Follow);
  }, []);

  return (
    <Container>
      <MapContainer
        ref={mapRef}
        center={{
          latitude: 37.502581,
          longitude: 127.035975,
          zoom: 16,
        }}
        animateToCoordinate={{
          latitude: currentLocation?.latitude as number,
          longitude: currentLocation?.longitude as number,
        }}
        setLocationTrackingMode={true}
        compass={false}
        zoomControl={false}
        useTextureView>
        {DummyStation.map(station => (
          <MarkerImage
            image={gs25Logo}
            coordinate={{
              latitude: station.location.latitude,
              longitude: station.location.longitude,
            }}
          />
        ))}
      </MapContainer>
      <BottomSheetContainer
        ref={bottomSheetRef}
        snapPoints={animatedSnapPoints}
        index={0}
        detached={true}
        animatedIndex={animatedBottomSheetIndex}
        bottomInset={insets.bottom + 30}
        backdropComponent={BottomSheetBackdrop}
        handleComponent={props => (
          <BottomSheetHandle {...props} bottomSheetRef={bottomSheetRef} />
        )}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}>
        <BottomSheetContent onLayout={handleContentLayout}>
          <BottomSheetHeaderContainer
            activeOpacity={1}
            onPress={() => {
              bottomSheetRef.current?.snapToIndex(1);
            }}>
            <BottomSheetHeaderLeftImage
              source={bottomSheetHeaderImageLeft}
              resizeMode="contain">
              <BottomSheetTitle>구매 / 반납</BottomSheetTitle>
            </BottomSheetHeaderLeftImage>
            <BottomSheetHeaderCenterImage
              source={bottomSheetHeaderImageCenter}
            />
            <BottomSheetHeaderRightImage
              source={bottomSheetHeaderImageCenter}
              resizeMode="stretch">
              <GSLogoImage source={GSLogo} />
              <Spacer width={5} />
              <PB12>{`${AddPoints(11451)}P`}</PB12>
              <Spacer width={10} />
            </BottomSheetHeaderRightImage>
          </BottomSheetHeaderContainer>
          <QRContent
            style={{
              opacity: animatedBottomSheetIndex,
            }}>
            <Spacer height={13} />
            <QRCode
              value={'{"user_id": "a7f4a8b3-d550-4e04-b62f-8154079c78a5"}'}
              size={200}
            />
            <Spacer height={20} />
            <RemainTimeContainer>
              <ClockIcon />
              <Spacer width={8} />
              <RemainTimeText>QR 코드는 1분 동안만 유효합니다.</RemainTimeText>
            </RemainTimeContainer>
            <Spacer height={20} />
            <Button
              onPress={() => {
                navigation.navigate('Return');
              }}>
              <ButtonText>반납 이력 보기</ButtonText>
            </Button>
            <Spacer height={10} />
            <TransparentButton
              onPress={() => {
                navigation.navigate('Card');
              }}>
              <TransparentButtonText>GS&POINT 설정하기</TransparentButtonText>
            </TransparentButton>
          </QRContent>
        </BottomSheetContent>
      </BottomSheetContainer>
    </Container>
  );
};

export default MainPage;
