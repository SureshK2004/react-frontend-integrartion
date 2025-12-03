import React from 'react';
import { ThemeToggle } from '../theme-toggle';
import { Calendar, CalendarDays, MapPin } from 'lucide-react';

interface Co2EmissionHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Co2EmissionHeader: React.FC<Co2EmissionHeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'week', label: 'Week', icon: CalendarDays },
    { id: 'month', label: 'Month', icon: MapPin },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between m-3">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Live Tracking - Employee Summary
        </h2>
        <ThemeToggle />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
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
    </div>
  );
};

export default Co2EmissionHeader;
