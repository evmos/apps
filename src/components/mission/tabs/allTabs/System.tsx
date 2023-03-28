import { useCallback } from "react";
import { useAnnouncements } from "../../../../internal/mission/functionality/hooks/useAnnouncements";
import FeedItem from "../../feeds/FeedItem";
import FeedContainer from "../../feeds/FeedContainer";
import Container from "./Container";

const System = () => {
  const { systemAnnouncements } = useAnnouncements();
  const drawLatest = useCallback(() => {
    return systemAnnouncements.map((item) => {
      return (
        <FeedContainer key={item.id}>
          <FeedItem annoucement={item} />
        </FeedContainer>
      );
    });
  }, [systemAnnouncements]);

  return (
    <Container>
      <>{drawLatest()}</>
    </Container>
  );
};

export default System;
