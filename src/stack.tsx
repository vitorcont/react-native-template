import React from 'react';
import { useDispatch } from 'react-redux';

import { setHandleUnauthorizedError } from './api/axios';
import AuthStack from './pages/Auth/AuthStack';
import ContentStack from './pages/Content/ContentStack';
import { createStack } from './services/navigation';
import { checkLogin, refreshToken } from './store/Auth/action';

const Navigator = () => {
  const dispatch = useDispatch();
  const MainStack = createStack();

  setHandleUnauthorizedError(() => {
    dispatch(refreshToken());
  });

  React.useEffect(() => {
    dispatch(checkLogin());
  }, []);

  return (
    <MainStack.Navigator
      initialRouteName='Start'
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="Start" component={AuthStack} />
      <MainStack.Screen name="Content" component={ContentStack} />
    </MainStack.Navigator>
  );
};

export default Navigator;
