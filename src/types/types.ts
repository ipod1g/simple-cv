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
};
