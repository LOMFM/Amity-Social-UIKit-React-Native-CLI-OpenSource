import React, { FC, memo } from 'react';
import { View } from 'react-native';
import useConfig from '../../../hook/useConfig';
import { ComponentID, PageID } from '../../../enum/enumUIKitID';
import AmityGlobalFeedComponent from '../AmityGlobalFeedComponent/AmityGlobalFeedComponent';

type AmityNewsFeedComponentType = {
  pageId?: PageID;
  onEmpty?: VoidFunction;
};

const AmityNewsFeedComponent: FC<AmityNewsFeedComponentType> = ({
  pageId = PageID.WildCardPage,
  onEmpty,
}) => {
  const { excludes } = useConfig();
  const componentId = ComponentID.newsfeed_component;
  const uiReference = `${pageId}/${componentId}/*`;

  if (excludes.includes(uiReference)) return null;

  return (
    <View testID={uiReference} accessibilityLabel={uiReference}>
      <AmityGlobalFeedComponent pageId={pageId} onEmpty={onEmpty} />
    </View>
  );
};

export default memo(AmityNewsFeedComponent);
