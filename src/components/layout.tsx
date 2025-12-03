// components/layout.tsx
import React, { useMemo, useState } from 'react';
import { Sidebar } from './sidebar';
import { MobileBottomNav } from './mobile-bottom-nav';
import { DashboardHeader } from './dashboard/dashboard-header';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);
  const location = useLocation();

  const contentMarginClass = useMemo(() => {
    return isSidebarExpanded ? 'md:ml-64' : 'md:ml-16';
  }, [isSidebarExpanded]);

  // Show header ONLY on dashboard route (root path '/')
  const showHeader = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar onExpandedChange={setIsSidebarExpanded} />
      
      <div className={cn(contentMarginClass, 'transition-all duration-300 ease-in-out')}>
        {showHeader && <DashboardHeader />} {/* Only show on dashboard */}
        
        <main className={cn(
          'pb-16 md:pb-0',
          className
        )}>
          {children}
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}