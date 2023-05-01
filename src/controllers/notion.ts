import { TOKEN } from '@/config';
import {
  Client,
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from '@notionhq/client';

const notion = new Client({
  auth: TOKEN,
});

// const options = {
//   method: 'POST',
//   headers: {
//     accept: 'application/json',
//     'Notion-Version': '2022-06-28',
//     'content-type': 'application/json',
//     Authorization: `Bearer ${TOKEN}`,
//   },
//   body: JSON.stringify({
//     page_size: 100,
//     sorts: [
//       {
//         property: 'Duration',
//         direction: 'descending',
//       },
//     ],
//   }),
// };

export const getDatabase = async (databaseId: any) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Duration',
          direction: 'descending',
        },
      ],
    });
    return response.results;
    // const res = await fetch(
    //   `https://api.notion.com/v1/databases/${databaseId}/query`,
    //   options
    // );
    // const response = await res.json();
    // return response.results;
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          console.debug('Request timed out!');
          break;
        case APIErrorCode.ObjectNotFound:
          console.debug('Object not found!');
          break;
        case APIErrorCode.Unauthorized:
          console.debug('Unauthorized!');
          break;
        default:
          console.log(error);
        // you could even take advantage of exhaustiveness checking
        // assertNever(error.code)
      }
    }
  }
};

export const getPage = async (pageId: any) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId: string) => {
  blockId = blockId.replaceAll('-', '');

  const { results } = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  // Fetches all child blocks recursively - be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks: any = results.map(async (block) => {
    // if (block.has_children) {
    //   const children = await getBlocks(block.id);
    //   return { ...block, children };
    // }
    return block;
  });

  return await Promise.all(childBlocks).then((blocks) => {
    return blocks.reduce((acc, curr) => {
      if (curr.type === 'bulleted_list_item') {
        if (acc[acc.length - 1]?.type === 'bulleted_list') {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: 'bulleted_list',
            bulleted_list: { children: [curr] },
          });
        }
      } else if (curr.type === 'numbered_list_item') {
        if (acc[acc.length - 1]?.type === 'numbered_list') {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: 'numbered_list',
            numbered_list: { children: [curr] },
          });
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  });
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// export function parseDatabase(data: any): ProjectType[] | any {

// add some error handling here
export function parseDatabase(data: any): any {
  if (data === undefined || data === null) return null;

  return data.map((contentData: any) => ({
    id: contentData.id,
    title: contentData.properties.Name.title[0].plain_text,
    duration: contentData.properties.Duration.date,
    subTitle:
      contentData.properties.Subtitle.select === null
        ? null
        : contentData.properties.Subtitle.select.name,
    projectURL: contentData.properties['Project URL']?.url,
    githubURL: contentData.properties['Github']?.url,
    section: contentData.properties.Section.select.name,
    points: {
      point1:
        contentData.properties['Point 1'].rich_text.length === 0
          ? null
          : contentData.properties['Point 1'].rich_text[0].plain_text,
      point2:
        contentData.properties['Point 2'].rich_text.length === 0
          ? null
          : contentData.properties['Point 2'].rich_text[0].plain_text,
      point3:
        contentData.properties['Point 3'].rich_text.length === 0
          ? null
          : contentData.properties['Point 3'].rich_text[0].plain_text,
      point4:
        contentData.properties['Point 4'].rich_text.length === 0
          ? null
          : contentData.properties['Point 4'].rich_text[0].plain_text,
    },

    // description:
    //   contentData.properties.Description.rich_text.length === 0
    //     ? null
    //     : contentData.properties.Description.rich_text[0].plain_text,
    // coverImage: contentData.cover
    //   ? contentData.cover.external
    //     ? contentData.cover.external.url
    //     : contentData.cover.file.url
    //   : null,
  }));
}
