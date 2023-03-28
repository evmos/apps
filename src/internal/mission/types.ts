export type RecordsResponse = {
  id: string;
  createdTime: string;
  fields: {
    Description: string;
    Name: string;
    "Web Link": string;
    Type: string;
    "Start Date Time": string;
    "Posted By": {
      id: string;
      email: string;
      name: string;
    };
  };
};

export type AnnouncementsResponse = {
  records: RecordsResponse[];
};
