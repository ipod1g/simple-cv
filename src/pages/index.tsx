import { Source_Sans_Pro } from 'next/font/google';
import ProfileTab from '@/components/ProfileTab';
import Main from '@/components/Main';
import { getDatabase, parseDatabase } from '@/controllers/notion';
import { DATABASE_ID } from '@/config';
import { TNotionData } from '@/types/types';

const source = Source_Sans_Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function Home({
  notionDataArray,
}: {
  notionDataArray: TNotionData[];
}) {
  console.log(notionDataArray);

  return (
    <div
      className={`${source.className} h-fit w-full flex lg:flex-row flex-col text-pale/90 tracking-[2px] leading-20`}
    >
      <ProfileTab />
      <Main notionDataArray={notionDataArray} />
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(DATABASE_ID);
  const parsedData = parseDatabase(database);

  return {
    props: {
      notionDataArray: parsedData,
    },
    revalidate: 1,
  };
};
