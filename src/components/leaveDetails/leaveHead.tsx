import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "../theme-toggle";
import { 
  Calendar, 
  Plane, 
  CalendarDays 
} from "lucide-react";

type TabType = "leave" | "holiday" | "calendar";

const LeaveHead: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTab = (): TabType => {
    if (location.pathname === "/holiday") return "holiday";
    if (location.pathname === "/calendar") return "calendar";
    return "leave"; // default to leave
  };

  const [activeTab, setActiveTab] = React.useState<TabType>(getActiveTab());

  // Update active tab when route changes
  React.useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);

  const tabs = [
    { 
      id: "leave" as TabType, 
      label: "Leave", 
      icon: Plane,
      path: "/leave"
    },
    { 
      id: "holiday" as TabType, 
      label: "Holiday", 
      icon: CalendarDays,
      path: "/holiday"
    },
    { 
      id: "calendar" as TabType, 
      label: "Calendar", 
      icon: Calendar,
      path: "/calendar"
    },
  ];

  const handleTabClick = (tabId: TabType, path: string) => {
    setActiveTab(tabId);
    navigate(path);
  };

  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Calendar Details
          </h2>
          
          {/* Button-style Tabs with Icons */}
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id, tab.path)}
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

export default LeaveHead;