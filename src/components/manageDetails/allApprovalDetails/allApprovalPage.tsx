// components/manageDetail/subPages/CreateUserPage.tsx
import React, { useState } from 'react';
import AllApprovalHead from './allApprovalHead';
import AttendanceApproval from './attendanceApproval';
import LeaveApproval from './leaveApproval';
import LeaveSummary from './leaveSummary';

type TabType = "attendance" | "leave" | "summary";

const AllApprovalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("attendance");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "attendance":
        return <AttendanceApproval />;
      case "leave":
        return <LeaveApproval />;
      case "summary":
        return <LeaveSummary />;
      default:
        return <AttendanceApproval />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <AllApprovalHead activeTab={activeTab} onTabChange={handleTabChange} />
      {renderContent()}
    </div>
  );
};

export default AllApprovalPage;