// components/learnPage.tsx
import React, { useState } from "react";
import LearnHead from "./learnHead";
import MyLearnPage from "./mylearnPage";

type TabType = "mylearning" | "myauthoring" | "explore";

const LearnPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("mylearning");
  const [filters, setFilters] = useState<any>({});

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Handle filter changes from all tabs
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log("Global filter state updated:", newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <LearnHead activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Tab content would go here */}
      <div className="mt-6">
        {activeTab === "mylearning" && <MyLearnPage />}
        
        {activeTab === "myauthoring" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              My Authoring Content
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              This is where you can manage the courses and content you've created or are authoring.
            </p>
          </div>
        )}
        
        {activeTab === "explore" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Explore Content
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse and discover new learning materials, courses, and resources available to you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnPage;