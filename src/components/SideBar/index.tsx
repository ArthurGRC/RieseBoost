import SideBarWeb from '@/src/components/SideBar/Web';
import { Home, MessageSquareMore, Package, ShoppingBag, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';

const SideBar = () => {
  const path = usePathname();
  const toGo = (pathToGo: string) => `${path}/${pathToGo}`

  const paths = [
    {
      title: 'Inicio',
      href: '/dashboard',
      icon: Home,
    },
    {
      title: 'Vendas',
      href: toGo('orders'),
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
    </div>
  );
};

export default SideBar;
