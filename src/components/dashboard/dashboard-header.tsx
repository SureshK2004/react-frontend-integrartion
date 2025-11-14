
import { ThemeToggle } from '@/components/theme-toggle';

export function DashboardHeader() {
  return (
    <header className="bg-white dark:bg-gray-900 px-6 py-4">
      <div className="flex items-center justify-between m-7">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          {/* <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening today.
          </p> */}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}