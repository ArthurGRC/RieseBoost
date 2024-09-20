import SideBarWeb from '@/src/components/SideBar/Web';
import SideBarMobile from '@/src/components/SideBar/Mobile';
import { Home, MessageSquareMore, Package, ShoppingBag, Users } from 'lucide-react';

const SideBar = () => {
  const paths = [
    {
      title: 'Inicio',
      href: '#',
      icon: Home,
    },
    {
      title: 'Vendas',
      href: '#',
      icon: ShoppingBag,
    },
    {
      title: 'Produtos',
      href: '#',
      icon: Package,
    },
    {
      title: 'Clientes',
      href: '#',
      icon: Users,
    },
    {
      title: 'Mensagens',
      href: '#',
      icon: MessageSquareMore,
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <SideBarWeb paths={paths} />
      <SideBarMobile paths={paths} />
    </div>
  );
};

export default SideBar;
