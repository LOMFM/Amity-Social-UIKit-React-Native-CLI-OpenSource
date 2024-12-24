import React from 'react';
import { Pressable, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { postIcon } from '../../../svg/svg-xml-list';
import { styles } from './styles';

interface IFloatingButton {
  onPress: () => any;
  isGlobalFeed?: boolean;
  icon?: string;
}
export default function FloatingButton({
  onPress,
  isGlobalFeed = true,
  icon,
}: IFloatingButton) {
  return (
    <View style={!isGlobalFeed ? styles.otherFeedContainer : styles.container}>
      <Pressable
        onPress={() => {
          onPress && onPress();
        }}
        style={styles.button}
      >
        <SvgXml xml={icon || postIcon('#FFFFFF')} width="30" height="30" />
      </Pressable>
    </View>
  );
}
