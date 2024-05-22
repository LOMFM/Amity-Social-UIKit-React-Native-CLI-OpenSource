import { StyleSheet } from 'react-native';
import type { MyMD3Theme } from 'src/providers/amity-ui-kit-provider';

export const useStyles = (theme: MyMD3Theme) => {
  const styles = StyleSheet.create({
    moderatorTitle: {
      fontSize: 12,
      color: theme.colors.primary,
    },
    moderatorRow: {
      flexDirection: 'row',
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: theme.colors.primaryShade3,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    moderatorBadge: {
      width: 10,
      height: 10,
      marginRight: 4,
    },
  });

  return styles;
};
