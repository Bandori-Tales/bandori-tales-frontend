export interface GoogleDriveGetFiles {
  files: {
    id: string;
    name: string;
  }[];
}

export interface GoogleDriveCreate {
  id: string;
  name: string;
}

export interface GoogleDriveError {
  error: {
    code: number;
    message: string;
    errors: {
      message: string;
      domain: string;
    }[];
  };
}
