import { EVMOS_BACKEND } from "../wallet/functionality/networkConfig";
import { AnnouncementsResponse } from "./types";

export const getAnnouncements = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/Announcements`);
  return res.json() as Promise<AnnouncementsResponse>;
};
