import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MyMD3Theme } from '../../../providers/amity-ui-kit-provider';

export const useStyle = () => {
  const theme = useTheme() as MyMD3Theme;
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 240,
      right: 10,
    },
    otherFeedContainer: {
      position: 'absolute',
      bottom: 35,
      right: 10,
    },
    button: {
      width: 64,
      height: 64,
      borderRadius: 35,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
    },
  })
};
