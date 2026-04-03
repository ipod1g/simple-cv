import type { ReactNode } from "react";
import ProfileTab from "@/components/profileTab/ProfileTab";
import Main from "@/components/content/Main";

const Layout = (props: { children: ReactNode }) => {
  return (
    <>
      <div className="overflow-x-hidden h-fit w-full flex lg:flex-row flex-col text-black dark:bg-black/50 border-b-black/10 dark:border-b-pale/20 border-b-2 font-medium dark:text-pale/90 tracking-[2px] leading-20">
        <ProfileTab />
        <Main>{props.children}</Main>
      </div>
      <div className="w-full h-0 mb-[88vh] flex justify-end">
        <a
          href="#"
          className="relative w-fit top-4 right-8 text-black/60 dark:text-pale/60"
        >
          Back To Top
        </a>
      </div>
    </>
  );
};

export default Layout;
