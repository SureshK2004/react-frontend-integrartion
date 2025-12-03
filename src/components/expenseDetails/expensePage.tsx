// components/expensePage.tsx
import React, { useState } from "react";
import ExpenseHead from "./expenseHead";
import ExpenseDashboard from "./expenceDashboard";
import ExpenseSummary from "./expenseSummary";

type TabType = "dashboard" | "summary";

const ExpensePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
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
      case "dashboard":
        return <ExpenseDashboard />;
      case "summary":
        return <ExpenseSummary />;
      default:
        return <ExpenseDashboard />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ExpenseHead activeTab={activeTab} onTabChange={handleTabChange} />
      {renderContent()}
    </div>
  );
};

export default ExpensePage;