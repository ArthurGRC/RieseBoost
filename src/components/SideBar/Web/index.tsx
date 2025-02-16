'use client';

import { ArchiveRestore, Bolt, HandCoins, LayoutDashboard, MailQuestion, MessagesSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/Ui/tooltip';
import LogoExtensa from '@/public/assets/logo-branca-extenso.png';

const iconMap: Record<string, any> = {
  LayoutDashboard,
  ArchiveRestore,
  HandCoins,
  MailQuestion,
  MessagesSquare,
};

function SideBarWeb({ paths }: { paths: { title: string; href: string; icon: string }[] }) {
  const path = usePathname();
  const currentPath = path.startsWith('/dashboard/') ? path.substring(11) : path;

  return (
    <nav className="w-60 h-full flex flex-col items-center gap-4 px-2 py-5 bg-rbGray rounded-3xl">
      <TooltipProvider>
        <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-full mb-5">
          <Image src={LogoExtensa} alt="Logotipo" className="w-[230px] h-[230px] max-w-none" />
        </Link>
        {paths?.map((item) => {
          const IconComponent = iconMap[item.icon];

          return (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link
                  href={item?.href}
                  className={`flex mx-5 items-center h-9 w-full px-3 ${
                    currentPath === item?.href ? 'rounded-xl bg-rbLightCoral p-6' : ''
                  } text-white`}
                >
                  {IconComponent && <IconComponent className="h-8 w-8" />}
                  <span className="ml-2 whitespace-nowrap">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="#" className="flex ml-x items-center h-9 w-full px-3 rounded-lg text-white mt-auto">
              <Bolt className="h-8 w-8" />
              <span>Configurações</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Sair</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  );
}

export default SideBarWeb;
