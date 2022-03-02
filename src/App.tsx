import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import PushNotification from 'react-native-push-notification';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';

import AppContent from './AppContent';
import useTheme from './hooks/useTheme';
import i18n from './i18n';
import store from './store';

const App: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'default',
        channelName: i18n.t('NOTIFICATION_CHANNEL'),
        playSound: true,
      },
      () => { },
    );

    const unsubscribe = messaging().onMessage((message) => {
      if (message.notification) {
        PushNotification.localNotification({
          channelId: 'default',
          message: message.notification.body ?? '',
          title: message.notification.title,
          bigPictureUrl: message.notification.android?.imageUrl,
          largeIcon: '',
          largeIconUrl: message.notification.android?.imageUrl,
          smallIcon: 'ic_stat_notification',
        });
      }
    });

    return unsubscribe;
  }, []);


  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppContent />
        <FlashMessage position="top" />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
