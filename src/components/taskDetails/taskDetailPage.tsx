import React, { useState } from "react";
import TaskDetailHead from "./taskDetailHead";
import DashboardPage from "./DashboardPage";
import AssignPage from "./AssignPage ";
import TasksPage from "./TasksPage ";
import TaskSummaryPage from "./TaskSummaryPage ";
// import AssignPage from "./tabs/AssignPage";
// import TasksPage from "./tabs/TasksPage";
// import TaskSummaryPage from "./tabs/TaskSummaryPage";

const ManagePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardPage />;
      case "assign":
        return <AssignPage />
      case "tasks":
        return <TasksPage />
      case "summary":
        return <TaskSummaryPage />
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <TaskDetailHead activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default ManagePage;
