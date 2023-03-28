import { useCallback } from "react";
import { useAnnouncements } from "../../../../internal/mission/functionality/hooks/useAnnouncements";
import FeedItem from "../../feeds/FeedItem";
import MissionContainer from "../../MissionContainer";

const System = () => {
  const { systemAnnouncements } = useAnnouncements();
  console.log(systemAnnouncements);
  const drawLatest = useCallback(() => {
    return systemAnnouncements?.map((item) => {
      return (
        <div
          key={item.id}
          className="mb-4 border-b border-darkPearl border-opacity-80 pb-5 last:border-b-0"
        >
          <FeedItem annoucement={item} />
        </div>
      );
    });
  }, [systemAnnouncements]);

  return (
    <MissionContainer>
      <div className="max-h-48 overflow-y-auto">{drawLatest()}</div>
    </MissionContainer>
  );
};

export default System;
