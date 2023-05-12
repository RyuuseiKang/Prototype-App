import {useEffect, useRef, useState} from 'react';
import {AppState, Linking, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const useLocationPermission = () => {
  const appState = useRef(AppState.currentState);
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] =
    useState<boolean | null>(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    requestLocationPermission();
    const onChanged = AppState.addEventListener('change', (state) => {
      if (appState.current.match(/inactive|background/) && state === 'active') {
        requestLocationPermission();
      }

      appState.current = state;
    });

    return () => {
      onChanged.remove();
    };
  }, []);

  const requestLocationPermission = async () => {
    let granted;
    if (Platform.OS === 'ios') {
      const response = await Geolocation.requestAuthorization('whenInUse');
      granted = response === 'granted';
    } else {
      const response = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      granted = response;
    }

    if (granted === false) {
      setIsLocationPermissionGranted(false);
      return;
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});

        setIsLocationPermissionGranted(true);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const openLocationPermissionSetting = async (): Promise<void> => {
    await Linking.openSettings();
  };

  return [
    isLocationPermissionGranted,
    currentLocation,
    requestLocationPermission,
    openLocationPermissionSetting,
  ] as const;
};

export default useLocationPermission;
