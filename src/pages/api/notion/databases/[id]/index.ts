import { NextApiRequest, NextApiResponse } from 'next';
import { DATABASE_ID } from '@/config';
import { getDatabase } from '@/controllers/notionController';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;

  const dbId = id === 'cv_database' ? DATABASE_ID : id;

  // const response = await fetch(
  //   `https://api.notion.com/v1/databases/${dbId}/query`,
  //   {
  //     headers: {
  //       'Notion-Version': '2022-06-28',
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${TOKEN}`,
  //     },
  //     // this took so long to resolve...
  //     method: 'POST',
  //     mode: 'cors',
  //   }
  // );

  const response = getDatabase(dbId);

  const data: any = await response;

  res.status(200).json(data);
}
