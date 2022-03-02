import React from 'react';
import { View, Text } from 'react-native';

import useTheme from '@mobile/hooks/useTheme';

const Login = () => {
  const { colorScheme, theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{ color: theme.colors.black }}
      >React Base Project</Text>
      <Text style={{
        backgroundColor: theme.colors.primary,
      }}>{colorScheme}</Text>
    </View>
  );
};

export default Login;
