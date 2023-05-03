import { getDatabase, parseDatabase } from '@/controllers/notion';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

export default function useNotionData(id: string) {
  const { data, error, isLoading } = useSWR(
    `/api/notion/databases/${id}`,
    fetcher
  );

  return {
    data: data,
    isLoading,
    isError: error,
  };
}
