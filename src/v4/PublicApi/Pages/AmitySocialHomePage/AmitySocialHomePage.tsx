import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import Explore from '../../../../screens/Explore';
import CustomSocialTab from '../../../component/CustomSocialTab/CustomSocialTab';
import { useUiKitConfig } from '../../../hook';
import { ComponentID, ElementID, PageID } from '../../../enum/enumUIKitID';
import { MyMD3Theme } from '~/providers/amity-ui-kit-provider';
import { useTheme } from 'react-native-paper';
import { useBehaviour } from '../../../providers/BehaviourProvider';
import AmitySocialHomeTopNavigationComponent from '../../Components/AmitySocialHomeTopNavigationComponent/AmitySocialHomeTopNavigationComponent';
import AmityEmptyNewsFeedComponent from '../../Components/AmityEmptyNewsFeedComponent/AmityEmptyNewsFeedComponent';
import { CommunityRepository } from '@amityco/ts-sdk-react-native';
import AmityMyCommunitiesComponent from '../../Components/AmityMyCommunitiesComponent/AmityMyCommunitiesComponent';
import AmityNewsFeedComponent from '../../Components/AmityNewsFeedComponent/AmityNewsFeedComponent';
import NewsFeedLoadingComponent from '../../../component/NewsFeedLoadingComponent/NewsFeedLoadingComponent';
import FloatingButton from '../../../../components/FloatingButton';
import { usePopup } from '../../../hook/usePopup';
import Popup from '../../../component/PopupMenu/PopupMenu';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/RouteParamList';
import AmityCreatePostMenuComponent from '../../Components/AmityCreatePostMenuComponent/AmityCreatePostMenuComponent';

LogBox.ignoreAllLogs(true);
const AmitySocialHomePage = () => {
  const theme = useTheme() as MyMD3Theme;
  const { AmitySocialHomePageBehaviour } = useBehaviour();
  const [newsFeedTab] = useUiKitConfig({
    page: PageID.social_home_page,
    component: ComponentID.WildCardComponent,
    element: ElementID.newsfeed_button,
    keys: ['text'],
  }) as string[];
  const [exploreTab] = useUiKitConfig({
    page: PageID.social_home_page,
    component: ComponentID.WildCardComponent,
    element: ElementID.explore_button,
    keys: ['text'],
  }) as string[];
  const [myCommunitiesTab] = useUiKitConfig({
    page: PageID.social_home_page,
    component: ComponentID.WildCardComponent,
    element: ElementID.my_communities_button,
    keys: ['text'],
  }) as string[];

  const [activeTab, setActiveTab] = useState<string>(newsFeedTab);
  const [myCommunities, setMyCommunities] = useState<Amity.Community[]>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const { isOpen, setIsOpen, toggle } = usePopup();
  const navigation = useNavigation() as NativeStackNavigationProp<RootStackParamList>;
  const { AmitySocialHomeTopNavigationComponentBehaviour } = useBehaviour();

  useFocusEffect(
    useCallback(() => {
      return () => setIsOpen(false);
    }, [setIsOpen])
  );

  useEffect(() => {
    const unsubscribe = CommunityRepository.getCommunities(
      { membership: 'member', limit: 20 },
      ({ data, error, loading }) => {
        if (error) return;
        setPageLoading(loading);
        if (!loading) setMyCommunities(data);
      }
    );
    return () => unsubscribe();
  }, []);

  const onTabChange = useCallback(
    (tabName: string) => {
      if (AmitySocialHomePageBehaviour.onChooseTab)
        return AmitySocialHomePageBehaviour.onChooseTab(tabName);
      setActiveTab(tabName);
    },
    [AmitySocialHomePageBehaviour]
  );

  const onPressExploreCommunity = useCallback(() => {
    onTabChange(exploreTab);
  }, [exploreTab, onTabChange]);

  const renderNewsFeed = () => {
    if (pageLoading) return <NewsFeedLoadingComponent />;
    if (activeTab === exploreTab) return <Explore />;
    if (!myCommunities?.length)
      return (
        <AmityEmptyNewsFeedComponent
          pageId={PageID.social_home_page}
          onPressExploreCommunity={onPressExploreCommunity}
        />
      );
    if (activeTab === newsFeedTab) {
      return <AmityNewsFeedComponent pageId={PageID.social_home_page} />;
    }
    if (activeTab === myCommunitiesTab)
      return (
        <AmityMyCommunitiesComponent
          pageId={PageID.social_home_page}
          componentId={ComponentID.my_communities}
        />
      );
    return null;
  };

  const onToggleCreateComponent = useCallback(() => {
    toggle();
  }, [toggle]);

  const onCreateCommunity = useCallback(() => {
    navigation.navigate('CreateCommunity');
  }, [navigation]);

  const onPressCreate = useCallback(() => {
    if (AmitySocialHomeTopNavigationComponentBehaviour.onPressCreate)
      return AmitySocialHomeTopNavigationComponentBehaviour.onPressCreate();
    if (activeTab === myCommunitiesTab) return onCreateCommunity();
    else if(activeTab === "chatting-room") return;
    return onToggleCreateComponent();
  }, [
    AmitySocialHomeTopNavigationComponentBehaviour,
    activeTab,
    myCommunitiesTab,
    onCreateCommunity,
    onToggleCreateComponent,
  ]);

  return (
    <SafeAreaView
      testID="social_home_page"
      accessibilityLabel="social_home_page"
      id="social_home_page"
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <AmitySocialHomeTopNavigationComponent activeTab={activeTab} />
      <CustomSocialTab
        tabNames={[newsFeedTab, exploreTab, myCommunitiesTab]}
        onTabChange={onTabChange}
        activeTab={activeTab}
      />
      {renderNewsFeed()}
      {activeTab !== exploreTab && (<FloatingButton onPress={onPressCreate} isGlobalFeed={false} isPost={activeTab === newsFeedTab}/>)}

      <Popup
        setOpen={setIsOpen}
        open={isOpen}
        position={{
          bottom: 75,
          right: 15,
        }}
      >
        <AmityCreatePostMenuComponent
          pageId={PageID.social_home_page}
          componentId={ComponentID.create_post_menu}
        />
      </Popup>

    </SafeAreaView>
  );
};
export default React.memo(AmitySocialHomePage);
