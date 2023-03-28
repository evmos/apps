import { useCallback } from "react";
import { useAnnouncements } from "../../../internal/mission/functionality/hooks/useAnnouncements";
import BannerMessages from "../../common/banners/BannerMessages";
import { tabsAnnouncements } from "../tabs/Content";
import Tabs from "../tabs/Tabs";

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
      <>
        <Tabs tabsContent={tabsAnnouncements} />
      </>
    );
  }, [loading, error]);

  return drawAnnouncements();
};

export default NewsFeed;
