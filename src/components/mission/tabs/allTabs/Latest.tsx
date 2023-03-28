import { useCallback } from "react";
import { useAnnouncements } from "../../../../internal/mission/functionality/hooks/useAnnouncements";
import FeedItem from "../../feeds/FeedItem";
import FeedContainer from "../../feeds/FeedContainer";
import Container from "./Container";

const Latest = () => {
  const { announcements } = useAnnouncements();
  const drawLatest = useCallback(() => {
    return announcements?.map((item) => {
      return (
        <FeedContainer key={item.id}>
          <FeedItem annoucement={item} />
        </FeedContainer>
      );
    });
  }, [announcements]);

  return (
    <Container>
      <>{drawLatest()}</>
    </Container>
  );
};

export default Latest;
