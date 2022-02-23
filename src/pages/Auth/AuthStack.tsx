import React from 'react';
import { createStack } from '@mobile/services/navigation';

const AuthStack = () => {
  const StartStack = createStack();

  return (
    <StartStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <StartStack.Screen name="Login" component={() => <></>} />
    </StartStack.Navigator>
  );
};

export default AuthStack;
