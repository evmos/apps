import { useCallback } from "react";
import { useAnnouncements } from "../../../../internal/mission/functionality/hooks/useAnnouncements";
import FeedItem from "../../feeds/FeedItem";
import FeedContainer from "../../feeds/FeedContainer";
import Container from "./Container";

const News = () => {
  const { newsAnnouncements } = useAnnouncements();
  const drawLatest = useCallback(() => {
    return newsAnnouncements.map((item) => {
      return (
        <FeedContainer key={item.id}>
          <FeedItem annoucement={item} />
        </FeedContainer>
      );
    });
  }, [newsAnnouncements]);

  return (
    <Container>
      <>{drawLatest()}</>
    </Container>
  );
};

export default News;
