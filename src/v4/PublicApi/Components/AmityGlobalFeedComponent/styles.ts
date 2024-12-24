import { StyleSheet } from 'react-native';
import type { MyMD3Theme } from 'src/providers/amity-ui-kit-provider';

export const useStyle = (themeStyle: MyMD3Theme) => {
  const styles = StyleSheet.create({
    feedWrap: {
      backgroundColor: themeStyle.colors.background,
      height: '100%',
      paddingBottom: 50,
    },
    feedContentStyle: {
      flexGrow: 1,
      paddingBottom: 100,
      backgroundColor: themeStyle.colors.background,
    },
    emptyContainer: {
      flex: 1,
    },
  });
  return styles;
};
