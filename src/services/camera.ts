/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  CameraOptions,
} from 'react-native-image-picker';

import i18n from '@mobile/i18n';

export const getFileExtension = (base64: string) => {
  const extension = base64.split('data:image/')[1].split(';base64')[0];

  return extension;
};

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: i18n.t('SERVICES.CAMERA.PERMISSIONS.TITLE'),
        message: i18n.t('SERVICES.CAMERA.PERMISSIONS.DESCRIPTION'),
        buttonNeutral: i18n.t('SERVICES.CAMERA.PERMISSIONS.ASK_ME_LATER'),
        buttonNegative: i18n.t('SERVICES.CAMERA.PERMISSIONS.CANCEL'),
        buttonPositive: i18n.t('SERVICES.CAMERA.PERMISSIONS.OK'),
      }
    );
  } catch (err) {
    //
  }
};

export const onHandleChangePhoto = (setPicture: (arg0: string) => void) => {
  Alert.alert(
    i18n.t('SERVICES.CAMERA.PERMISSIONS.SOURCE'),
    '',
    [
      {
        text: i18n.t('SERVICES.CAMERA.PERMISSIONS.CAMERA'),
        onPress: () => {
          launchCamera(
            { mediaType: 'photo', includeBase64: true },
            (response) => {
              if (response.errorMessage) {
                return requestCameraPermission();
              }
              if (response.didCancel) {
                return false;
              }
              setPicture(
                `data:image/png;base64,${response && response.assets && response.assets.shift().base64
                }`
              );

              return null;
            }
          );
        },
      },
      {
        text: i18n.t('SERVICES.CAMERA.PERMISSIONS.GALLERY'),
        onPress: () => {
          launchImageLibrary(
            { mediaType: 'photo', includeBase64: true },
            (response) => {
              if (response.didCancel) {
                return false;
              }
              setPicture(
                `data:image/png;base64,${response && response.assets && response.assets.shift().base64
                }`
              );
            }
          );
        },
      },
      Platform.OS === 'ios' && {
        text: i18n.t('SERVICES.CAMERA.PERMISSIONS.CANCEL'),
        onPress: () => { },
      },
    ],
    { cancelable: true }
  );
};
