
import { Ticket, User, LogOut, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileBottomNavProps {
  className?: string;
}

const navItems = [
  { name: 'Raise Ticket', icon: Ticket },
  { name: 'Menu', icon: Menu },
  { name: 'Profile', icon: User },
  { name: 'Sign Out', icon: LogOut },
];

export function MobileBottomNav({ className }: MobileBottomNavProps) {
  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 md:hidden z-30',
      className
    )}>
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            className="flex flex-col items-center p-2 text-xs text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors duration-200"
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}