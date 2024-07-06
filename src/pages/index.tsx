import Background from "@/components/common/Background";
import Main from "@/components/content/Main";
import NotionSection from "@/components/content/NotionSection";
import { DATABASE_ID } from "@/config";
import { getDatabase, parseDatabase } from "@/controllers/notionController";
import { TNotionData } from "@/types/types";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Home({
  notionDataArray,
}: {
  notionDataArray: TNotionData[];
}) {
  return (
    <>
      <NotionSection notionDataArray={notionDataArray} />
      <Background />
    </>
  );
}

export const getServerSideProps = async () => {
  const database = (await getDatabase(
    DATABASE_ID
  )) as unknown as DatabaseObjectResponse[];
  const parsedData = database ? parseDatabase(database) : [];

  return {
    props: {
      notionDataArray: parsedData,
    },
  };
};
