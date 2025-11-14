// components/attendance/attendance.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ExportComponent from '../exportOption/exportTo';
import UserTable, { defaultUsers } from '../userDetails/user';
import CommonFilters, { FilterConfig } from '../filtersDetails/filters';
import AttendanceHead from '../attendanceDetail/attendanceHead';
import WeeklyPage from './weeklyPage';
import MapPage from './mapPage';

const Attendance: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path.includes('/weekly')) return 'weekly';
    if (path.includes('/map')) return 'map';
    return 'daily';
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTabFromPath());

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'daily') {
      navigate('/attendance');
    } else {
      navigate(`/attendance/${tab}`);
    }
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // Implement your filter logic here
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement your search logic here
  };

  const handleRefresh = () => {
    console.log('Refresh clicked');
    // Implement your refresh logic here
  };

  // Configuration for daily attendance filters
  const dailyFilterConfig: FilterConfig = {
    showUserType: true,
    showDepartment: true,
    showZone: true,        // Now only in slide-in modal
    showBranch: true,      // Now only in slide-in modal
    showFromDate: true,
    showToDate: true,
    showFilterForm: true,
    showColumnSelector: true, // Now only in slide-in modal
    showStatus: true,
    showTotalHours: true,
    showDesignation: true,
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,
    labels: {
      searchPlaceholder: "Search attendance"
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Use the header component */}
      <AttendanceHead activeTab={activeTab} setActiveTab={handleTabChange} />
      
      {/* Conditionally render Filters only for daily tab */}
      {activeTab === 'daily' && (
        <CommonFilters config={dailyFilterConfig} showTopFilters={true} />
      )}
      
      {/* Content based on active tab */}
      {activeTab === 'daily' && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
              Daily Attendance
            </h3>
            <div className="flex items-center">
              <ExportComponent
                tableId="attendance-user-table"
                filename="daily_attendance"
              />
            </div>
          </div>
          <UserTable users={defaultUsers} />
        </div>
      )}

      {activeTab === 'weekly' && <WeeklyPage />}
      {activeTab === 'map' && <MapPage />}
    </div>
  );
};

export default Attendance;