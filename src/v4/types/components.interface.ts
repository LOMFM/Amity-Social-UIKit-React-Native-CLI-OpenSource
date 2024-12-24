import { UserInterface } from 'amity-react-native-social-ui-kit/src/types';

export interface ICustomComponents {
  AmityGlobalSearchAgentComponent?: React.FC<{ searchTerm?: string }>;
  AmityCreateStreamComponent?: React.FC<{
    navigation: any;
    route: any;
  }>;
  AmityLivestreamSectionComponent: React.FC<{
    streamId: string;
    mainPostId: string;
    user: UserInterface;
  }>;
  AmityUserProfileComponent: React.FC<{ route: any }>;
  AmityEditProfileComponent?: React.FC<{
    navigation: any;
    route: any;
  }>;
}
