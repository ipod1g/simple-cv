import { TOKEN } from "@/config";
import {
  Client,
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: TOKEN,
});

export const getDatabase = async (databaseId: any) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Duration",
          direction: "descending",
        },
      ],
    });
    return response.results;
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          console.debug("Request timed out!");
          break;
        case APIErrorCode.ObjectNotFound:
          console.debug("Object not found!");
          break;
        case APIErrorCode.Unauthorized:
          console.debug("Unauthorized!");
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
  blockId = blockId.replaceAll("-", "");

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
      if (curr.type === "bulleted_list_item") {
        if (acc[acc.length - 1]?.type === "bulleted_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "bulleted_list",
            bulleted_list: { children: [curr] },
          });
        }
      } else if (curr.type === "numbered_list_item") {
        if (acc[acc.length - 1]?.type === "numbered_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "numbered_list",
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

interface ParsedDatabaseItem {
  id: string;
  title: string | null;
  duration: any;
  subTitle: string | null;
  projectURL: string | null;
  githubURL: string | null;
  section: string | null;
  points: {
    point1: string | null;
    point2: string | null;
    point3: string | null;
    point4: string | null;
  };
  thumbnail: string | null;
}
function getPropertyValue(property: any, path: string[]): any {
  try {
    return path.reduce((acc, cur) => acc[cur], property) || null;
  } catch {
    return null;
  }
}

export function parseDatabase(
  data: DatabaseObjectResponse[]
): ParsedDatabaseItem[] | null {
  if (!Array.isArray(data)) return null;

  return data.map((contentData) => {
    const { properties } = contentData;
    return {
      id: contentData.id,
      title: getPropertyValue(properties, [
        "Name",
        "title",
        "0",
        "text",
        "content",
      ]),
      duration: properties.Duration.date,
      subTitle: getPropertyValue(properties, ["Subtitle", "select", "name"]),
      projectURL: properties["Project URL"]?.url,
      githubURL: properties["Github"]?.url,
      section: getPropertyValue(properties, ["Section", "select", "name"]),
      points: {
        point1: getPropertyValue(properties, [
          "Point 1",
          "rich_text",
          "0",
          "plain_text",
        ]),
        point2: getPropertyValue(properties, [
          "Point 2",
          "rich_text",
          "0",
          "plain_text",
        ]),
        point3: getPropertyValue(properties, [
          "Point 3",
          "rich_text",
          "0",
          "plain_text",
        ]),
        point4: getPropertyValue(properties, [
          "Point 4",
          "rich_text",
          "0",
          "plain_text",
        ]),
      },
      thumbnail: properties.Thumbnail.files[0]?.external
        ? properties.Thumbnail.files[0].external.url
        : null,
    };
  });
}
