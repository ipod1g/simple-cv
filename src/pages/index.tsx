import NotionSection from '@/components/content/NotionSection';
import { DATABASE_ID } from '@/config';
import { getDatabase, parseDatabase } from '@/controllers/notionController';
import { TNotionData } from '@/types/types';

export default function Home({
  notionDataArray,
}: {
  notionDataArray: TNotionData[];
}) {
  return <NotionSection notionDataArray={notionDataArray} />;
}

export const getServerSideProps = async () => {
  const database = await getDatabase(DATABASE_ID);
  const parsedData = parseDatabase(database);

  return {
    props: {
      notionDataArray: parsedData,
    },
  };
};
