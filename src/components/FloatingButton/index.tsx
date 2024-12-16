import React from 'react';
import { Pressable, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { plusIcon, postIcon } from '../../svg/svg-xml-list';
import { styles } from './styles';

interface IBackBtn {
  onPress: () => any;
  isGlobalFeed?: boolean;
  isPost?: boolean;
}

export default function FloatingButton({
  onPress,
  isGlobalFeed = true,
  isPost = true,
}: IBackBtn) {
  return (
    <View style={!isGlobalFeed ? styles.otherFeedContainer : styles.container}>
      <Pressable
        onPress={() => {
          onPress && onPress();
        }}
        style={styles.button}
      >
        <SvgXml xml={ isPost ? postIcon('#FFFFFF') : plusIcon('#FFFFFF')} width="30" height="30" />
      </Pressable>
    </View>
  );
}
