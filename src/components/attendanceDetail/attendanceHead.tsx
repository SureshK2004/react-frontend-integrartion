// components/attendanceDetail/attendanceNavigation.tsx
import React from 'react';
import AttendanceTable from './attendancePageNavigation';
import { ThemeToggle } from '@/components/theme-toggle';

interface AttendanceNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AttendanceHead: React.FC<AttendanceNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between m-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Attendance Details
          </h2>
        </div>
        <ThemeToggle />
      </div>

      {/* Tab Navigation - Reusing existing AttendanceTable component */}
      <AttendanceTable activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default AttendanceHead;