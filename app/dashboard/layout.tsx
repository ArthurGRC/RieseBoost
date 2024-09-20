'use client';

import SideBar from '@/src/components/SideBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <SideBar />
      {children}
    </main>
  );
};

export default Layout;
