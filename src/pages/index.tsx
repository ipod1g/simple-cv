import NotionSection from '@/components/NotionSection';

export default function Home() {
  return <NotionSection />;
}

// export const getServerSideProps = async () => {
//   const database = await getDatabase(DATABASE_ID);
//   const parsedData = parseDatabase(database);

//   return {
//     props: {
//       notionDataArray: parsedData,
//     },
//     // revalidate: 1,
//   };
// };
