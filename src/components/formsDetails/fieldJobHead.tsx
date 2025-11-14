// components/fieldJobHead.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';
import { LayoutDashboard, BarChart3 } from 'lucide-react';

type TabType = "create" | "view";

interface FieldJobHeadProps {
  // Remove onTabChange if not needed
}

const FieldJobHead: React.FC<FieldJobHeadProps> = () => {
  const location = useLocation();

  const tabs = [
    {
      id: "create" as TabType,
      label: "Create Forms",
      icon: LayoutDashboard,
      path: "/forms"
    },
    {
      id: "view" as TabType,
      label: "view Forms",
      icon: BarChart3,
      path: "/forms/view"
    },
  ];

  const getActiveTab = (): TabType => {
    if (location.pathname === '/forms/view') return 'view';
    return 'create';
  };

  const currentActiveTab = getActiveTab();

  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Forms Details
          </h2>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                    ${currentActiveTab === tab.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }
                  `}
                >
                  <IconComponent size={18} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default FieldJobHead;