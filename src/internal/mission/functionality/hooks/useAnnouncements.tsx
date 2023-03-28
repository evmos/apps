import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAnnouncements } from "../../fetch";
import { RecordsResponse } from "../../types";

export const useAnnouncements = () => {
  const announcementsResponse = useQuery({
    queryKey: ["announcements"],
    queryFn: () => getAnnouncements(),
  });

  let response: RecordsResponse[] = [];
  if (announcementsResponse.data !== undefined) {
    response = announcementsResponse.data.records;
  }

  const getSystemAnnouncements = useMemo(() => {
    if (announcementsResponse.data === undefined) {
      return [];
    }
    return announcementsResponse.data.records.filter((i) => {
      i.fields.Type === "System";
    });
  }, [announcementsResponse.data]);

  return {
    announcements: response,
    loading: announcementsResponse.isLoading,
    error: announcementsResponse.error,
    systemAnnouncements: getSystemAnnouncements,
  };
};
