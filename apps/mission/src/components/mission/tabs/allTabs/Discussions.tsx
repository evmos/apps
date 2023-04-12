import { useCallback } from "react";
import FeedItem from "../../feeds/FeedItem";
import FeedContainer from "../../feeds/FeedContainer";
import Container from "./Container";
import { useAnnouncements } from "../../../../internal/functionality/hooks/useAnnoucements";

const Discussions = () => {
  const { discussionsAnnouncements } = useAnnouncements();
  const drawLatest = useCallback(() => {
    return discussionsAnnouncements.map((item) => {
      return (
        <FeedContainer key={item.id}>
          <FeedItem annoucement={item} />
        </FeedContainer>
      );
    });
  }, [discussionsAnnouncements]);

  return (
    <Container>
      <>{drawLatest()}</>
    </Container>
  );
};

export default Discussions;
