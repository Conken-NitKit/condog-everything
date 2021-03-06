import { NextPage } from 'next';

export type PageComponent<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};
