// import { ProjectType } from '@/pages/project';
import { useState, useEffect, useMemo } from 'react';
import { TOKEN, DATABASE_ID } from '../../config/index';
import Loading from '@/components/common/Loading';
import Image from 'next/image';
import { NotionModalHeader } from '@/components/modal/NotionModalHeader';
// import ReactPlayer from 'react-player';

interface Props {
  pageId: string;
  project: any | null;
  visible: boolean;
  onClose: () => void;
}

const NOTION_API_KEY = TOKEN;

const NotionModal: React.FC<Props> = ({
  pageId,
  visible,
  onClose,
  project,
}) => {
  const [pageContent, setPageContent] = useState<any | null>(null);

  const handleBackDropClick = () => {
    onClose();
    setPageContent(null);
  };

  const memoizedContent = useMemo(() => {
    if (!pageContent) return null;
    return pageContent;
  }, [pageContent]);

  // Helper function to group bulleted_list_item
  const groupBulletedListItems = (results: any) => {
    const groupedItems = [];
    let currentGroup: any[] | null = null;

    results.forEach((result: any) => {
      if (result.type === 'bulleted_list_item') {
        if (!currentGroup) {
          currentGroup = [];
        }
        currentGroup.push(result);
      } else {
        if (currentGroup) {
          groupedItems.push({ type: 'bulleted_list', items: currentGroup });
          currentGroup = null;
        }
        groupedItems.push(result);
      }
    });

    if (currentGroup) {
      groupedItems.push({ type: 'bulleted_list', items: currentGroup });
    }

    return groupedItems;
  };

  const renderNotionPage = () => {
    const results = memoizedContent.results;
    const groupedResults = groupBulletedListItems(results);
    if (!results || results.length === 0) {
      return (
        <p className="text-lg font-semibold py-6 text-orange-500 dark:text-yellow-300">
          Documentation is not ready yet
        </p>
      );
    }
    return groupedResults.map((result: any) => {
      switch (result.type) {
        case 'paragraph':
          return (
            <p key={result.id} className="my-2">
              {result.paragraph.rich_text.length === 0 ? (
                <div className="my-6" />
              ) : (
                result.paragraph.rich_text
                  .map((text: any) => text.plain_text)
                  .join('')
              )}
            </p>
          );
        case 'heading_1':
          return (
            <h1
              key={result.id}
              className="font-extrabold text-4xl dark:text-white my-2"
            >
              {result.heading_1.rich_text
                .map((text: any) => text.plain_text)
                .join('')}
            </h1>
          );
        case 'heading_2':
          return (
            <h2
              key={result.id}
              className="font-bold text-2xl dark:text-white my-2"
            >
              {result.heading_2.rich_text
                .map((text: any) => text.plain_text)
                .join('')}
            </h2>
          );
        case 'heading_3':
          return (
            <h3
              key={result.id}
              className="font-bold text-lg dark:text-white my-2"
            >
              {result.heading_3.rich_text
                .map((text: any) => text.plain_text)
                .join('')}
            </h3>
          );

        case 'divider':
          return (
            <div key={result.id} className="border-b w-full mt-3 mb-6"></div>
          );

        // case 'video':
        //   return (
        //     <ReactPlayer
        //       url={result.video.external.url}
        //       playing={false}
        //       muted={true}
        //       controls={true}
        //     />
        //   );
        case 'bulleted_list':
          return (
            <ul key={result.items[0].id} className="mb-8 list-circle px-5">
              {result.items.map((item: any) => (
                <li key={item.id} className="my-2">
                  {item.bulleted_list_item.rich_text
                    .map((text: any) => text.plain_text)
                    .join('')}
                </li>
              ))}
            </ul>
          );
        case 'image':
          return (
            <Image
              width={1000}
              height={0}
              priority
              style={{ objectFit: 'contain', maxHeight: 400 }}
              className="rounded-t-xl"
              src={result.image.file.url}
              alt="project image"
              quality={50}
            />
          );

        default:
          return null;
      }
    });
  };

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(`/api/notion/blocks/${pageId}`, {
          headers: {
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${NOTION_API_KEY}`,
          },
          mode: 'cors',
        });
        const data: any = await response.json();
        console.log(data);
        setPageContent(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (visible) {
      fetchPageContent();

      // Disable scrolling when the modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Re-enable scrolling when the modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [pageId, visible]);

  return visible ? (
    <div className="bg-black/50 backdrop-blur-sm w-screen h-screen fixed inset-0 z-50 flex justify-center items-center">
      <div className="fixed w-full h-full" onClick={handleBackDropClick}></div>
      <div className="h-[85svh] border border-black/50 dark:border-pale/50 overflow-auto w-11/12 max-w-screen-md dark:bg-black bg-white text-black dark:text-pale z-20">
        {project ? <NotionModalHeader project={project} /> : <></>}
        <div className="px-[12%]">
          {memoizedContent ? renderNotionPage() : <Loading />}
        </div>
      </div>
    </div>
  ) : null;
};

export default NotionModal;
