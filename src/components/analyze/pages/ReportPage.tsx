// components/analyzeDetail/reportsPage.tsx
import React, { useState } from 'react';
import AnalyzeLayout from '../AnalyzeLayout';
import CommonFilters, { FilterConfig } from '../../filtersDetails/filters';
import TableComponent from '@/components/common/TableComponent';

export interface AttendanceReport {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  dateRange: string;
  totalClockHrs: string;
  totalTimesheetHrs: string;
  noOfLeaves: number;
}

// Mock data based on your screenshot
export const defaultReports: AttendanceReport[] = [
  {
    id: "1",
    employeeId: "DM 0001",
    name: "Abinash Kumar",
    department: "QA Department",
    dateRange: "06-11-2025 to 15-11-2025",
    totalClockHrs: "80.5",
    totalTimesheetHrs: "76.0",
    noOfLeaves: 0,
  },
  {
    id: "2",
    employeeId: "DM 0002",
    name: "Ashok Patel",
    department: "Development",
    dateRange: "06-11-2025 to 15-11-2025",
    totalClockHrs: "78.0",
    totalTimesheetHrs: "75.5",
    noOfLeaves: 1,
  },
  {
    id: "3",
    employeeId: "DM 0003",
    name: "Akash Singh",
    department: "Design",
    dateRange: "06-11-2025 to 15-11-2025",
    totalClockHrs: "82.0",
    totalTimesheetHrs: "80.0",
    noOfLeaves: 0,
  },
  {
    id: "4",
    employeeId: "DM 0004",
    name: "Kumar Reddy",
    department: "QA Department",
    dateRange: "06-11-2025 to 15-11-2025",
    totalClockHrs: "76.5",
    totalTimesheetHrs: "74.0",
    noOfLeaves: 2,
  },
  {
    id: "5",
    employeeId: "DM 0005",
    name: "Sugan Raj",
    department: "Development",
    dateRange: "06-11-2025 to 15-11-2025",
    totalClockHrs: "79.0",
    totalTimesheetHrs: "77.5",
    noOfLeaves: 0,
  },
  {
    id: "6",
    employeeId: "DM 0006",
    name: "Ravi Shankar",
    department: "Marketing",
    dateRange: "06-11-2025 to 15-11-2025",
    totalClockHrs: "81.5",
    totalTimesheetHrs: "79.0",
    noOfLeaves: 1,
  },
  {
    id: "7",
    employeeId: "DM 0007",
    name: "Priya Sharma",
    department: "HR",
    dateRange: "06-11-2025 to 15-11-2025",
    totalClockHrs: "77.0",
    totalTimesheetHrs: "75.0",
    noOfLeaves: 0,
  },
  {
    id: "8",
    employeeId: "DM 0008",
    name: "Vikram Singh",
    department: "Development",
    dateRange: "06-11-2025 to 15-11-2025",
    totalClockHrs: "83.0",
    totalTimesheetHrs: "81.5",
    noOfLeaves: 0,
  },
  {
    id: "9",
    employeeId: "DM 0009",
    name: "Neha Gupta",
    department: "Design",
    dateRange: "06-11-2025 to 15-11-2025",
    totalClockHrs: "75.5",
    totalTimesheetHrs: "73.0",
    noOfLeaves: 1,
  },
  {
    id: "10",
    employeeId: "DM 0010",
    name: "Rajesh Kumar",
    department: "QA Department",
    dateRange: "06-11-2025 to 15-11-2025",
    totalClockHrs: "80.0",
    totalTimesheetHrs: "78.5",
    noOfLeaves: 0,
  },
  {
    id: "11",
    employeeId: "DM 0011",
    name: "Rajesh Kumar",
    department: "QA Department",
    dateRange: "06-11-2025 to 15-11-2025",
    totalClockHrs: "80.0",
    totalTimesheetHrs: "78.5",
    noOfLeaves: 1,
  }
];

interface ReportsTableProps {
  reports?: AttendanceReport[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const ReportsTable: React.FC<ReportsTableProps> = ({
  reports = [],
  loading = false,
  error = null,
  onRetry,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const displayReports = reports.length > 0 ? reports : defaultReports;
  const totalPages = Math.ceil(displayReports.length / itemsPerPage);

  // Define table columns based on your screenshot
  const columns = [
    { key: "employeeId", label: "EMPLOYEE ID" },
    { key: "name", label: "NAME" },
    { key: "department", label: "DEPARTMENT" },
    { key: "dateRange", label: "DATE RANGE" },
    { key: "totalClockHrs", label: "TOTAL CLOCK HRS" },
    { key: "totalTimesheetHrs", label: "TOTAL TIMESHEET HRS" },
    { key: "noOfLeaves", label: "NO OF LEAVES" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading reports...</span>
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
        tableId="attendance-reports-table"
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

const ReportsPage: React.FC = () => {
  const handleFilterChange = (filters: any) => {
    console.log("Report filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("Report search query:", query);
  };

  const handleRefresh = () => {
    console.log("Report refresh clicked");
  };

  // Filter configuration based on your screenshot
  const reportFilterConfig: FilterConfig = {
    showUserType: true,
    showDepartment: true,
    showZone: true,
    showBranch: true,
    showFromDate: true,
    showToDate: true,
    showFilterForm: true,
    showColumnSelector: true,
    showStatus: false, // Not needed for reports
    showTotalHours: false, // Not needed for reports
    showDesignation: true,
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,
    labels: {
      searchPlaceholder: "Search users...",
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
            Attendance Report
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            All users attendance details in one place.
          </p>
        </div> */}

        {/* Filters Section */}
        <div className="mb-6">
          <CommonFilters 
            config={reportFilterConfig} 
            showTopFilters={true} 
          />
        </div>

        {/* Reports Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Reports Overview
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Detailed attendance and timesheet information
              </p>
            </div>
          </div>

          <ReportsTable reports={[]} />
        </div>
      </div>
    </AnalyzeLayout>
  );
};

export default ReportsPage;