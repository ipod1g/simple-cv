import type { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type TNotionData = {
  id: string;
  section: string;
  title: string;
  subTitle: string | null;
  duration: {
    start: string;
    end: string | null;
  };
  projectURL: string | undefined;
  githubURL: string | null;
  points: {
    point1: string;
    point2: string | null;
    point3: string | null;
    point4: string | null;
  };
  thumbnail: string | null;
};

export type TNotionBulletPoints = {
  points: {
    point1: string;
    point2: string | null;
    point3: string | null;
    point4: string | null;
  };
};

export type CustomNotionDatabaseItem = Partial<DatabaseObjectResponse> & {
  properties: {
    Name: {
      title: [
        {
          text: {
            content: string;
          };
        }
      ];
    };
    Duration: {
      date: {
        start: string;
        end: string;
      };
    };
    Subtitle: {
      select: {
        name: string;
      };
    };
    "Project URL": {
      url: string;
    };
    Github: {
      url: string;
    };
    Section: {
      select: {
        name: string;
      };
    };
    "Point 1": {
      rich_text: [
        {
          plain_text: string;
        }
      ];
    };
    "Point 2": {
      rich_text: [
        {
          plain_text: string;
        }
      ];
    };
    "Point 3": {
      rich_text: [
        {
          plain_text: string;
        }
      ];
    };
    "Point 4": {
      rich_text: [
        {
          plain_text: string;
        }
      ];
    };
    Thumbnail: {
      files: [
        {
          external: {
            url: string;
          };
          file: {
            url: string;
          };
        }
      ];
    };
  };
};
