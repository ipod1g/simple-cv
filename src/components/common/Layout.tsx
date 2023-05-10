import React, { ReactNode } from 'react';
import ProfileTab from '@/components/profileTab/ProfileTab';
import Background from '@/components/common/Background';
import Main from '@/components/content/Main';
import { Source_Sans_Pro } from 'next/font/google';

const source = Source_Sans_Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const Layout = (props: { children: ReactNode }) => {
  return (
    <div
      className={`${source.className} overflow-x-hidden h-fit w-full flex lg:flex-row flex-col text-black font-medium dark:text-pale/90 tracking-[2px] leading-20`}
    >
      <ProfileTab />
      <Main>{props.children}</Main>
    </div>
  );
};

export default Layout;
