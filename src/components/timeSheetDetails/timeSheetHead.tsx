// components/timeSheetHead.tsx
import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LayoutDashboard, BarChart3 } from 'lucide-react';

type TabType = "dashtimesheet" | "summarysheet";

interface TimeSheetHeadProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

const TimeSheetHead: React.FC<TimeSheetHeadProps> = ({ 
  activeTab = "dashtimesheet", 
  onTabChange 
}) => {
  const tabs = [
    { 
      id: "dashtimesheet" as TabType, 
      label: "Dashboard", 
      icon: LayoutDashboard,
    },
    // { 
    //   id: "summarysheet" as TabType, 
    //   label: "Summary", 
    //   icon: BarChart3,
    // },
  ];

  const handleTabClick = (tabId: TabType) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Time Sheet Details
          </h2>
          
          {/* Button-style Tabs with Icons */}
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }
                  `}
                >
                  <IconComponent size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        <ThemeToggle />
      </div>
    </div>
  );
};

export default TimeSheetHead;