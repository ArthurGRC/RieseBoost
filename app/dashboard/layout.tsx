import Header from '@/components/Header';
import Sidebar from '@/components/SideBar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </main>
  );
}

export default Layout;
