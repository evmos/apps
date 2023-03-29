import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { feedsTypes } from "../../constants";
import { getAnnouncements } from "../../fetch";
import { RecordsResponse } from "../../types";

export const useAnnouncements = () => {
  const announcementsResponse = useQuery({
    queryKey: ["announcements"],
    queryFn: () => getAnnouncements(),
  });

  const getAllAnnouncements = useMemo(() => {
    let response: RecordsResponse[] = [];
    if (announcementsResponse.data !== undefined) {
      response = announcementsResponse.data.records;
    }

    return response;
  }, [announcementsResponse.data]);

  const getSystemAnnouncements = useMemo(() => {
    if (announcementsResponse.data === undefined) {
      return [];
    }
    const filteredData = announcementsResponse.data.records.filter(
      (i) =>
        i.fields.Type !== undefined &&
        i.fields.Type.toLowerCase() === feedsTypes.SYSTEM
    );
    if (filteredData.length > 0) {
      return filteredData;
    } else {
      return [];
    }
  }, [announcementsResponse.data]);

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

  const getHeroAnnouncements = useMemo(() => {
    if (announcementsResponse.data === undefined) {
      return [];
    }

    const filteredData = announcementsResponse.data.records.filter(
      (i) => i.fields["Is Hero"] !== undefined && i.fields["Is Hero"] === true
    );
    if (filteredData.length > 0) {
      return filteredData;
    } else {
      return [];
    }
  }, [announcementsResponse.data]);
  return {
    announcements: getAllAnnouncements,
    loading: announcementsResponse.isLoading,
    error: announcementsResponse.error,
    systemAnnouncements: getSystemAnnouncements,
    newsAnnouncements: getNewsAnnouncements,
    heroAnnouncement: getHeroAnnouncements,
  };
};
