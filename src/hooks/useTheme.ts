import { useColorScheme } from 'react-native';

import { darkTheme, lightTheme } from '@mobile/theme';

const useTheme = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return { theme, colorScheme };
};

export default useTheme;
