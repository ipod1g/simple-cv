import React, { ReactNode } from 'react';

const Layout = (props: { children: ReactNode }) => {
  return <div className="overflow-x-hidden">{props.children}</div>;
};

export default Layout;
