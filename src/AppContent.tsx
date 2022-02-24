import analytics from '@react-native-firebase/analytics';
import { NavigationContainer } from '@react-navigation/native';
import React, { PureComponent } from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import tracking from '@mobile/services/firebase';
import { navigationRef, routeNameRef } from '@mobile/services/navigation';
import Navigator from '@mobile/stack';

class AppContent extends PureComponent {
  componentDidMount() {
    tracking();
    // LogBox.ignoreAllLogs();
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}
        >
          <Navigator />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

export default connect(null, null)(AppContent);
