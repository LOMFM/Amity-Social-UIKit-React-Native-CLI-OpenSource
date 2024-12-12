import { NativeModules, Platform } from 'react-native';
import AmityUiKitProvider from './providers/amity-ui-kit-provider';
import AmityUiKitSocial from './routes/SocialNavigator';
import {
  AmityStoryTabComponent,
  AmityCreateStoryPage,
  AmityDraftStoryPage,
  AmityViewStoryPage,
  AmitySocialHomePage,
  AmitySocialHomeTopNavigationComponent,
  AmityCommunitySearchResultComponent,
  AmitySocialGlobalSearchPage,
  AmityTopSearchBarComponent,
  AmityEmptyNewsFeedComponent,
  AmityGlobalFeedComponent,
  AmityMyCommunitiesComponent,
  AmityNewsFeedComponent,
  AmityPostContentComponent,
  AmityPostDetailPage,
  AmityPostTargetSelectionPageType,
  AmityCreatePostMenuComponent,
  AmityDetailedMediaAttachmentComponent,
  AmityMediaAttachmentComponent,
  AmityPostCommentComponent,
  AmityPostComposerPage,
  AmityPostEngagementActionsComponent,
  AmityPostTargetSelectionPage,
  AmityReactionListComponent,
  AmityStoryTargetSelectionPage,
  AmityUserSearchResultComponent,
  AmityMyCommunitiesSearchPage,
} from './v4';
import {
  AmityStoryTabComponentEnum,
  AmityPostComposerMode,
  mediaAttachment,
} from './v4/PublicApi/types';

import useAuth from './hooks/useAuth';

const LINKING_ERROR =
  `The package 'amity-react-native-social-ui-kit' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AmityReactNativeSocialUiKit = NativeModules.AmityReactNativeSocialUiKit
  ? NativeModules.AmityReactNativeSocialUiKit
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return AmityReactNativeSocialUiKit.multiply(a, b + 2 + 3);
}
export {
  AmityUiKitProvider,
  AmityUiKitSocial,
  AmityStoryTabComponent,
  AmityStoryTabComponentEnum,
  AmityCreateStoryPage,
  AmityDraftStoryPage,
  AmityViewStoryPage,
  AmitySocialHomePage,
  AmitySocialHomeTopNavigationComponent,
  AmityCommunitySearchResultComponent,
  AmitySocialGlobalSearchPage,
  AmityTopSearchBarComponent,
  AmityEmptyNewsFeedComponent,
  AmityGlobalFeedComponent,
  AmityMyCommunitiesComponent,
  AmityNewsFeedComponent,
  AmityPostContentComponent,
  AmityPostDetailPage,
  AmityPostTargetSelectionPageType,
  AmityCreatePostMenuComponent,
  AmityDetailedMediaAttachmentComponent,
  AmityMediaAttachmentComponent,
  AmityPostCommentComponent,
  AmityPostComposerPage,
  AmityPostEngagementActionsComponent,
  AmityPostTargetSelectionPage,
  AmityReactionListComponent,
  AmityStoryTargetSelectionPage,
  AmityUserSearchResultComponent,
  AmityMyCommunitiesSearchPage,
  AmityPostComposerMode,
  mediaAttachment,
  useAuth,
};
