'use client';

import SideBar from '@/src/components/SideBar';
import TopBar from '@/src/components/TopBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <TopBar />
      <SideBar />
      {children}
    </main>
  );
};

export default Layout;
