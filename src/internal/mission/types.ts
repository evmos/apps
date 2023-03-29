type FileUploadResponse = {
  filename: string;
  height: number;
  id: string;
  size: number;
  thumbnails: {
    full: {
      url: string;
      height: number;
      width: number;
    };
    large: {
      url: string;
      height: number;
      width: number;
    };
    small: {
      url: string;
      height: number;
      width: number;
    };
  };
  type: string;
  url: string;
  width: number;
};

export type RecordsResponse = {
  id: string;
  createdTime: string;
  fields: {
    "Is Hero"?: boolean;
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
    "File Upload"?: FileUploadResponse[];
  };
};

export type AnnouncementsResponse = {
  records: RecordsResponse[];
};
