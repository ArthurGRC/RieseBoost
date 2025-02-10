import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/Ui/tooltip';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/assets/logo.png';
import { LogOut } from 'lucide-react';
import { SideBarType } from '@/types/sideBar';

const SideBarWeb = ({ paths }: { paths: SideBarType }) => {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-rbGrey
       sm:flex flex-col"
    >
      <nav className="flex flex-col items-center gap-4 px-2 py-5">
        <TooltipProvider>
          <Link
            href="#"
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground rounded-full"
          >
            <Image src={Logo} alt="Logotipo" height={100} />
          </Link>
          {paths?.map((item: any) => (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:text-rbGray"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right"> {item.title}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:text-rbGray"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Sair</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default SideBarWeb;
