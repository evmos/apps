import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { feedsTypes } from "../../constants";
import { getAnnouncements } from "../../fetch";

export const useAnnouncements = () => {
  const announcementsResponse = useQuery({
    queryKey: ["announcements"],
    queryFn: () => getAnnouncements(),
  });

  const getNewsAnnouncements = useMemo(() => {
    if (announcementsResponse.data === undefined) {
      return [];
    }
    const filteredData = announcementsResponse.data.records.filter(
      (i) =>
        i.fields.Type !== undefined &&
        i.fields.Type.toLowerCase() === feedsTypes.NEWS
    );
    if (filteredData.length > 0) {
      return filteredData;
    } else {
      return [];
    }
  }, [announcementsResponse.data]);

  const getDiscussionsAnnouncements = useMemo(() => {
    if (announcementsResponse.data === undefined) {
      return [];
    }
    const filteredData = announcementsResponse.data.records.filter(
      (i) =>
        i.fields.Type !== undefined &&
        i.fields.Type.toLowerCase() === feedsTypes.DISCUSSIONS
    );
    if (filteredData.length > 0) {
      return filteredData;
    } else {
      return [];
    }
  }, [announcementsResponse.data]);

  const getGuidesAnnouncements = useMemo(() => {
    if (announcementsResponse.data === undefined) {
      return [];
    }
    const filteredData = announcementsResponse.data.records.filter(
      (i) =>
        i.fields.Type !== undefined &&
        i.fields.Type.toLowerCase() === feedsTypes.GUIDES
    );
    if (filteredData.length > 0) {
      return filteredData;
    } else {
      return [];
    }
  }, [announcementsResponse.data]);
  return {
    loading: announcementsResponse.isLoading,
    error: announcementsResponse.error,
    newsAnnouncements: getNewsAnnouncements,
    discussionsAnnouncements: getDiscussionsAnnouncements,
    guidesAnnouncements: getGuidesAnnouncements,
  };
};
