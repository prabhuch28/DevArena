'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

export default function AppHeader() {
  const pathname = usePathname();
  const pageTitle = pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard';

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
      <SidebarTrigger className="shrink-0 md:hidden" />
      <div className="w-full flex-1">
        <h1 className="text-lg font-semibold capitalize font-headline">
          {pageTitle}
        </h1>
      </div>
    </header>
  );
}
