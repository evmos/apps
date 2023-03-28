import { useCallback } from "react";
import { useAnnouncements } from "../../../internal/mission/functionality/hooks/useAnnouncements";
import BannerMessages from "../../common/banners/BannerMessages";
import SimpleTabs from "../../common/tabComponent/SimpleTabs";
import MissionContainer from "../MissionContainer";
import { tabsAnnouncements } from "../tabs/Content";

const NewsFeed = () => {
  const { loading, error } = useAnnouncements();

  const drawAnnouncements = useCallback(() => {
    if (loading) {
      return <BannerMessages text="Loading feeds..." spinner={true} />;
    }

    if (error) {
      return <BannerMessages text="No results" />;
    }

    return (
      <MissionContainer>
        <>
          <p className="text-2xl font-bold text-pearl">NEWS FEED</p>
          <SimpleTabs tabsContent={tabsAnnouncements} />
        </>
      </MissionContainer>
    );
  }, [loading, error]);

  return drawAnnouncements();
};

export default NewsFeed;
