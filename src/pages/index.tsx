import Main from '@/components/Main';
import { getDatabase, parseDatabase } from '@/controllers/notion';
import { DATABASE_ID } from '@/config';
import { TNotionData } from '@/types/types';

export default function Home({
  notionDataArray,
}: {
  notionDataArray: TNotionData[];
}) {
  // console.log(notionDataArray);
  return <Main notionDataArray={notionDataArray} />;
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
