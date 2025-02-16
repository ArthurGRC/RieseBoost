'use client';

import SideBarWeb from '@/src/components/SideBar/Web';

function SideBar() {
  const paths = [
    {
      title: 'Dashboard',
      href: 'home',
      icon: 'LayoutDashboard',
    },
    {
      title: 'Estoque',
      href: 'stock',
      icon: 'ArchiveRestore',
    },
    {
      title: 'Vendas',
      href: 'sales',
      icon: 'HandCoins',
    },
    {
      title: 'Mensagens',
      href: 'messages',
      icon: 'MessagesSquare',
    },
    {
      title: 'Perguntas',
      href: 'questions',
      icon: 'MailQuestion',
    },
  ];

  return (
    <div className="m-5">
      <SideBarWeb paths={paths} />
    </div>
  );
}

export default SideBar;
