import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/Ui/sheet';
import { Button } from '@/components/Ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/assets/logo.png';
import { LogOut, PanelBottom } from 'lucide-react';
import { SideBarType } from '@/src/types/sideBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Ui/avatar';

const SideBarMobile = ({ paths }: { paths: SideBarType }) => {
  return (
    <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 justify-between items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0  bg-rbGrey">
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex gap-2 items-center">
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelBottom className="w-5 h-5" />
                <span className="sr-only">Open / Close menu</span>
              </Button>
              <h1 className="text-white">Menu</h1>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-x flex flex-col">
            <SheetHeader>
              <Link href={'#'} className="flex h-10 w-auto rounded-full text-lg md:text-base gap-2" prefetch={false}>
                <Image src={Logo} alt="Logotipo" height={100} className="w-10" />
                <SheetTitle>Riese Boost</SheetTitle>
              </Link>
            </SheetHeader>
            <nav className="grid gap-6 text-lg font-medium">
              {paths.map((item: { title: string; href: string; icon: any }) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <item.icon className="h-5 w-5 transition-all" />
                  {item.title}
                </Link>
              ))}
            </nav>

            <nav className="mt-auto gap-4 px-2.5">
              <Link
                href="#"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <LogOut className="h-5 w-5 transition-all" />
                Sair
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/ArthurGRC" />
          <AvatarFallback>BR</AvatarFallback>
        </Avatar>
      </header>
    </div>
  );
};

export default SideBarMobile;
