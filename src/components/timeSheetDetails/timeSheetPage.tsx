import React, { useState } from "react";
import TimeSheetHead from "./timeSheetHead";
import TimeSheetDashboard from "./timeSheetDashboard";
import TimeSheetSummary from "./timeSheetsummary";


type TabType = "dashtimesheet" | "summarysheet";

const TimeSheetPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashtimesheet");
  const [filters, setFilters] = useState<any>({});

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Handle filter changes from both dashboard and summary
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log("Global filter state updated:", newFilters);
    // You can add API calls or data filtering logic here
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashtimesheet":
        return <TimeSheetDashboard />;
      case "summarysheet":
        return <TimeSheetSummary />;
      default:
        return <TimeSheetDashboard />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <TimeSheetHead activeTab={activeTab} onTabChange={handleTabChange} />
      {renderContent()}
    </div>
  );
};

export default TimeSheetPage;