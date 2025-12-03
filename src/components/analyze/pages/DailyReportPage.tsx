// components/analyzeDetail/dailyReportPage.tsx
import React, { useState } from 'react';
import AnalyzeLayout from '../AnalyzeLayout';
import CommonFilters, { FilterConfig } from '../../filtersDetails/filters';
import TableComponent from '@/components/common/TableComponent';

export interface DailyReport {
  campus:string;
  id: string;
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  date: string;
  firstPunchIn: string;
  lastPunchOut: string;
  isRegularize: string;
  actualIn: string;
  actualOut: string;
  approvedBy: string;
  totalHours: string;
  otWorkedHours: string;
  otStatus: string;
}

// Mock data based on your screenshot
export const defaultDailyReports: DailyReport[] = [
  {
    campus:"NA",
    id: "1",
    employeeId: "25",
    name: "Rajarajeswari",
    department: "Maintenance",
    designation: "QA",
    date: "30-10-2025",
    firstPunchIn: "30-10-2025 14:28:00",
    lastPunchOut: "30-10-2025 23:15:00",
    isRegularize: "No",
    actualIn: "E",
    actualOut: "E",
    approvedBy: "E",
    totalHours: "E",
    otWorkedHours: "E",
    otStatus: "L",
  },
  {
     campus:"NA",
    id: "2",
    employeeId: "26",
    name: "Abinash Kumar",
    department: "Development",
    designation: "Software Engineer",
    date: "30-10-2025",
    firstPunchIn: "30-10-2025 09:15:00",
    lastPunchOut: "30-10-2025 18:30:00",
    isRegularize: "Yes",
    actualIn: "09:15:00",
    actualOut: "18:30:00",
    approvedBy: "Manager",
    totalHours: "9.25",
    otWorkedHours: "1.25",
    otStatus: "Approved",
  },
  {
     campus:"NA",
    id: "3",
    employeeId: "27",
    name: "Ashok Patel",
    department: "QA",
    designation: "Test Engineer",
    date: "30-10-2025",
    firstPunchIn: "30-10-2025 09:00:00",
    lastPunchOut: "30-10-2025 17:45:00",
    isRegularize: "Yes",
    actualIn: "09:00:00",
    actualOut: "17:45:00",
    approvedBy: "QA Lead",
    totalHours: "8.75",
    otWorkedHours: "0.75",
    otStatus: "Pending",
  },
  {
     campus:"NA",
    id: "4",
    employeeId: "28",
    name: "Priya Sharma",
    department: "Design",
    designation: "UI/UX Designer",
    date: "30-10-2025",
    firstPunchIn: "30-10-2025 09:30:00",
    lastPunchOut: "30-10-2025 18:15:00",
    isRegularize: "Yes",
    actualIn: "09:30:00",
    actualOut: "18:15:00",
    approvedBy: "Design Head",
    totalHours: "8.75",
    otWorkedHours: "0.75",
    otStatus: "Approved",
  },
  {
     campus:"NA",
    id: "5",
    employeeId: "29",
    name: "Vikram Singh",
    department: "Maintenance",
    designation: "System Admin",
    date: "30-10-2025",
    firstPunchIn: "30-10-2025 08:45:00",
    lastPunchOut: "30-10-2025 19:00:00",
    isRegularize: "Yes",
    actualIn: "08:45:00",
    actualOut: "19:00:00",
    approvedBy: "IT Manager",
    totalHours: "10.25",
    otWorkedHours: "2.25",
    otStatus: "Approved",
  },
  {
     campus:"NA",
    id: "6",
    employeeId: "30",
    name: "Neha Gupta",
    department: "Development",
    designation: "Frontend Developer",
    date: "30-10-2025",
    firstPunchIn: "30-10-2025 09:15:00",
    lastPunchOut: "30-10-2025 18:45:00",
    isRegularize: "Yes",
    actualIn: "09:15:00",
    actualOut: "18:45:00",
    approvedBy: "Tech Lead",
    totalHours: "9.50",
    otWorkedHours: "1.50",
    otStatus: "Approved",
  },
  {
     campus:"NA",
    id: "7",
    employeeId: "31",
    name: "Rajesh Kumar",
    department: "HR",
    designation: "HR Executive",
    date: "30-10-2025",
    firstPunchIn: "30-10-2025 09:00:00",
    lastPunchOut: "30-10-2025 17:30:00",
    isRegularize: "Yes",
    actualIn: "09:00:00",
    actualOut: "17:30:00",
    approvedBy: "HR Manager",
    totalHours: "8.50",
    otWorkedHours: "0.50",
    otStatus: "Approved",
  },
  {
     campus:"NA",
    id: "8",
    employeeId: "32",
    name: "Sugan Raj",
    department: "QA",
    designation: "Automation Engineer",
    date: "30-10-2025",
    firstPunchIn: "30-10-2025 09:20:00",
    lastPunchOut: "30-10-2025 18:40:00",
    isRegularize: "Yes",
    actualIn: "09:20:00",
    actualOut: "18:40:00",
    approvedBy: "QA Manager",
    totalHours: "9.33",
    otWorkedHours: "1.33",
    otStatus: "Pending",
  },
  {
     campus:"NA",
    id: "9",
    employeeId: "33",
    name: "Akash Singh",
    department: "Development",
    designation: "Backend Developer",
    date: "30-10-2025",
    firstPunchIn: "30-10-2025 09:10:00",
    lastPunchOut: "30-10-2025 19:15:00",
    isRegularize: "Yes",
    actualIn: "09:10:00",
    actualOut: "19:15:00",
    approvedBy: "Project Manager",
    totalHours: "10.08",
    otWorkedHours: "2.08",
    otStatus: "Approved",
  },
  {
     campus:"NA",
    id: "10",
    employeeId: "34",
    name: "Kumar Reddy",
    department: "Maintenance",
    designation: "Network Engineer",
    date: "30-10-2025",
    firstPunchIn: "30-10-2025 08:30:00",
    lastPunchOut: "30-10-2025 17:45:00",
    isRegularize: "Yes",
    actualIn: "08:30:00",
    actualOut: "17:45:00",
    approvedBy: "IT Head",
    totalHours: "9.25",
    otWorkedHours: "1.25",
    otStatus: "Approved",
  },
  {
     campus:"NA",
    id: "11",
    employeeId: "35",
    name: "Kumar Reddy",
    department: "Maintenance",
    designation: "Network Engineer",
    date: "30-10-2025",
    firstPunchIn: "30-10-2025 08:30:00",
    lastPunchOut: "30-10-2025 17:45:00",
    isRegularize: "Yes",
    actualIn: "08:30:00",
    actualOut: "17:45:00",
    approvedBy: "IT Head",
    totalHours: "9.25",
    otWorkedHours: "1.25",
    otStatus: "Approved",
  }
];

interface DailyReportTableProps {
  dailyReports?: DailyReport[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const DailyReportTable: React.FC<DailyReportTableProps> = ({
  dailyReports = [],
  loading = false,
  error = null,
  onRetry,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const displayReports = dailyReports.length > 0 ? dailyReports : defaultDailyReports;
  const totalPages = Math.ceil(displayReports.length / itemsPerPage);

  // Define table columns based on your screenshot
  const columns = [
    { key :"campus" , label :"Campus"},
    { key: "employeeId", label: "Employee ID" },
    { key: "name", label: "Name" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "date", label: "Date" },
    { key: "firstPunchIn", label: "First Punch IN" },
    { key: "lastPunchOut", label: "Last Punch Out" },
    { key: "isRegularize", label: "Is Regularize" },
    { key: "actualIn", label: "Actual In" },
    { key: "actualOut", label: "Actual Out" },
    { key: "approvedBy", label: "Approved By" },
    { key: "totalHours", label: "Total Hours" },
    { key: "otWorkedHours", label: "OT Worked Hours" },
    { key: "otStatus", label: "OT Status" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading daily reports...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <TableComponent
        tableId="daily-reports-table"
        columns={columns}
        data={displayReports}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const DailyReportPage: React.FC = () => {
  const handleFilterChange = (filters: any) => {
    console.log("Daily report filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("Daily report search query:", query);
  };

  const handleRefresh = () => {
    console.log("Daily report refresh clicked");
  };

  // Filter configuration for daily reports
  const dailyReportFilterConfig: FilterConfig = {
    showUserType: true,
    showDepartment: true,
    showZone: true,
    showBranch: true,
    showFromDate: true,
    showToDate: true,
    showFilterForm: true,
    showColumnSelector: true,
    showStatus: true,
    showTotalHours: true,
    showDesignation: true,
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,
    labels: {
      searchPlaceholder: "Search employees...",
      fromDatePlaceholder: "dd-mm-yyyy",
      toDatePlaceholder: "dd-mm-yyyy",
      departmentPlaceholder: "Search department",
      branchPlaceholder: "Search branch",
      zonePlaceholder: "Search zone",
    },
  };

  return (
    <AnalyzeLayout>
      <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Header Section */}
        {/* <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Daily Report
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            All users attendance, total hours, break hours, and performed hours.
          </p>
        </div> */}

        {/* Filters Section */}
        <div className="mb-6">
          <CommonFilters 
            config={dailyReportFilterConfig} 
            showTopFilters={true} 
          />
        </div>

        {/* Daily Reports Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Daily Attendance Report
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Detailed daily punch-in/punch-out records and overtime information
              </p>
            </div>
           
          </div>

          <DailyReportTable dailyReports={[]} />
        </div>
      </div>
    </AnalyzeLayout>
  );
};

export default DailyReportPage;