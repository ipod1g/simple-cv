import Image from 'next/image';
import { Source_Sans_Pro } from 'next/font/google';
import ProfileTab from '@/components/ProfileTab';
import Main from '@/components/Main';

const source = Source_Sans_Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function Home() {
  return (
    <div
      className={`${source.className} h-fit w-full flex lg:flex-row flex-col text-pale/90 tracking-[2px] leading-20`}
    >
      <ProfileTab />
      <Main />
    </div>
  );
}
