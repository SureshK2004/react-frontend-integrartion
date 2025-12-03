// attendancePageNavigation.tsx (renamed from the second AttendanceNavigation)
import React from 'react';
import { Calendar, CalendarDays, MapPin } from 'lucide-react';

interface AttendanceTableProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AttendanceTabs: React.FC<AttendanceTableProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'daily', label: 'Daily', icon: Calendar },
    { id: 'weekly', label: 'Weekly', icon: CalendarDays },
    { id: 'map', label: 'Map View', icon: MapPin },
  ];

  return (
    <div className="flex gap-1 mb-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AttendanceTabs;