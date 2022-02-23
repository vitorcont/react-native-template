import {
  requestTrackingPermission,
  getTrackingStatus,
} from 'react-native-tracking-transparency';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
// import Bugsnag from '@bugsnag/react-native';

const tracking = async () => {
  try {
    const trackingStatus = await getTrackingStatus();
    if (
      trackingStatus === 'not-determined' &&
      trackingStatus !== 'unavailable'
    ) {
      await requestTrackingPermission();
    } else if (trackingStatus === 'authorized') {
      // Bugsnag.start();
      //!TODO Install Bugsnag
      await analytics().setAnalyticsCollectionEnabled(true);
      await crashlytics().setCrashlyticsCollectionEnabled(true);
    }
    await messaging().requestPermission();
  } catch (e) {
    // handle
  }
};

export default tracking;
