import messaging from '@react-native-firebase/messaging';

import NotificationAPI from '@mobile/controllers/notification';

const sendPushToken = async (token: string) => {
  await NotificationAPI.sendPushToken(token);
};

const pushToken = () => {
  messaging()
    .requestPermission()
    .then((status) => {
      if (
        status === messaging.AuthorizationStatus.AUTHORIZED ||
        status === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        messaging().getToken().then(sendPushToken);
      }
    });
};

export default pushToken;