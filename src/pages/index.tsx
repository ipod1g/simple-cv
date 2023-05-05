import NotionSection from '@/components/NotionSection';
import { DATABASE_ID } from '@/config';
import { getDatabase, parseDatabase } from '@/controllers/notionController';
import { TNotionData } from '@/types/types';
import { SWRConfig } from 'swr';

export const getServerSideProps = async () => {
  const database = await getDatabase(DATABASE_ID);
  const parsedData = parseDatabase(database);

  return {
    props: {
      notionDataArray: parsedData,
    },
    // revalidate: 1,
  };
};

export default function Home({
  notionDataArray,
}: {
  notionDataArray: TNotionData[];
}) {
  // export default function Home() {
  return <NotionSection notionDataArray={notionDataArray} />;
}
