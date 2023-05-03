// const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const fetcher = async <T>(...args: RequestInfo[]): Promise<T> => {
  const res = await fetch(...(args as [RequestInfo, RequestInit]));
  return res.json();
};

export default fetcher;
