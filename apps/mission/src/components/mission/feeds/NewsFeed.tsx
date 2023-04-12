import { useCallback } from "react";
import BannerMessages from "../../common/banners/BannerMessages";
import SimpleTabs from "../../common/tabComponent/SimpleTabs";
import MissionContainer from "../MissionContainer";
import { tabsAnnouncements } from "../tabs/Content";
import { useAnnouncements } from "../../../internal/functionality/hooks/useAnnoucements";

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
          <p className="font-[GreyCliff] text-xl font-bold text-pearl">
            NEWS FEED
          </p>
          <SimpleTabs tabsContent={tabsAnnouncements} />
        </>
      </MissionContainer>
    );
  }, [loading, error]);

  return drawAnnouncements();
};

export default NewsFeed;
