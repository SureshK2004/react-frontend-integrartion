// components/analyzeDetail/attendanceReportPage.tsx
import React, { useState } from 'react';
import AnalyzeLayout from '../AnalyzeLayout';
import CommonFilters, { FilterConfig } from '../../filtersDetails/filters';
import TableComponent from '@/components/common/TableComponent';

export interface AttendanceReport {
  campus: string;
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  date: string;
  assignedShift: string;
  workingShift: string;
  firstPunchIn: string;
  lastPunchOut: string;
  otWorkedHours: string;
  performedHours: string;
  totalHours: string;
}

// Mock data based on your screenshot
export const defaultAttendanceReports: AttendanceReport[] = [
  {
    campus: "Main Campus",
    employeeId: "25",
    name: "RAJARAJESWARI",
    department: "Maintanance",
    designation: "QA",
    date: "30-10-2025",
    assignedShift: "Day Shift",
    workingShift: "Day Shift",
    firstPunchIn: "30-10-2025 14:28:00",
    lastPunchOut: "30-10-2025 19:28:00",
    otWorkedHours: "0",
    performedHours: "05:00:00",
    totalHours: "5"
  },
  {
    campus: "Main Campus",
    employeeId: "26",
    name: "ABINASH KUMAR",
    department: "Development",
    designation: "Software Engineer",
    date: "30-10-2025",
    assignedShift: "Day Shift",
    workingShift: "Day Shift",
    firstPunchIn: "30-10-2025 09:00:00",
    lastPunchOut: "30-10-2025 18:00:00",
    otWorkedHours: "1",
    performedHours: "08:00:00",
    totalHours: "9"
  },
  {
    campus: "Tech Park",
    employeeId: "27",
    name: "PRIYA SHARMA",
    department: "Design",
    designation: "UI/UX Designer",
    date: "30-10-2025",
    assignedShift: "Day Shift",
    workingShift: "Day Shift",
    firstPunchIn: "30-10-2025 09:15:00",
    lastPunchOut: "30-10-2025 18:30:00",
    otWorkedHours: "1.5",
    performedHours: "08:15:00",
    totalHours: "9.25"
  },
  {
    campus: "Main Campus",
    employeeId: "28",
    name: "RAJESH KUMAR",
    department: "HR",
    designation: "HR Executive",
    date: "30-10-2025",
    assignedShift: "General Shift",
    workingShift: "General Shift",
    firstPunchIn: "30-10-2025 10:00:00",
    lastPunchOut: "30-10-2025 19:00:00",
    otWorkedHours: "0",
    performedHours: "08:00:00",
    totalHours: "8"
  },
  {
    campus: "Tech Park",
    employeeId: "29",
    name: "SUNITHA PATEL",
    department: "QA",
    designation: "Test Engineer",
    date: "30-10-2025",
    assignedShift: "Night Shift",
    workingShift: "Night Shift",
    firstPunchIn: "30-10-2025 20:00:00",
    lastPunchOut: "31-10-2025 05:00:00",
    otWorkedHours: "2",
    performedHours: "08:00:00",
    totalHours: "10"
  },
  {
    campus: "Main Campus",
    employeeId: "30",
    name: "VIKRAM SINGH",
    department: "Maintenance",
    designation: "System Admin",
    date: "30-10-2025",
    assignedShift: "Day Shift",
    workingShift: "Day Shift",
    firstPunchIn: "30-10-2025 08:45:00",
    lastPunchOut: "30-10-2025 17:45:00",
    otWorkedHours: "0",
    performedHours: "08:00:00",
    totalHours: "8"
  },
  {
    campus: "Tech Park",
    employeeId: "31",
    name: "ANITA DESAI",
    department: "Development",
    designation: "Frontend Developer",
    date: "30-10-2025",
    assignedShift: "Flexi Shift",
    workingShift: "Flexi Shift",
    firstPunchIn: "30-10-2025 11:00:00",
    lastPunchOut: "30-10-2025 20:00:00",
    otWorkedHours: "1",
    performedHours: "08:00:00",
    totalHours: "9"
  },
  {
    campus: "Main Campus",
    employeeId: "32",
    name: "KARTHIK REDDY",
    department: "Operations",
    designation: "Operations Manager",
    date: "30-10-2025",
    assignedShift: "Day Shift",
    workingShift: "Day Shift",
    firstPunchIn: "30-10-2025 09:30:00",
    lastPunchOut: "30-10-2025 18:30:00",
    otWorkedHours: "0.5",
    performedHours: "08:00:00",
    totalHours: "8.5"
  },
  {
    campus: "Tech Park",
    employeeId: "33",
    name: "MEERA NAIR",
    department: "Design",
    designation: "Graphic Designer",
    date: "30-10-2025",
    assignedShift: "Day Shift",
    workingShift: "Day Shift",
    firstPunchIn: "30-10-2025 09:00:00",
    lastPunchOut: "30-10-2025 17:00:00",
    otWorkedHours: "0",
    performedHours: "07:00:00",
    totalHours: "7"
  },
  {
    campus: "Main Campus",
    employeeId: "34",
    name: "ARJUN MENON",
    department: "Development",
    designation: "Backend Developer",
    date: "30-10-2025",
    assignedShift: "Day Shift",
    workingShift: "Day Shift",
    firstPunchIn: "30-10-2025 10:00:00",
    lastPunchOut: "30-10-2025 19:30:00",
    otWorkedHours: "1.5",
    performedHours: "08:30:00",
    totalHours: "9.5"
  }
];

interface AttendanceReportTableProps {
  attendanceReports?: AttendanceReport[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const AttendanceReportTable: React.FC<AttendanceReportTableProps> = ({
  attendanceReports = [],
  loading = false,
  error = null,
  onRetry,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const displayReports = attendanceReports.length > 0 ? attendanceReports : defaultAttendanceReports;
  const totalPages = Math.ceil(displayReports.length / itemsPerPage);

  // Define table columns based on your screenshot
  const columns = [
    { key: "campus", label: "Campus" },
    { key: "employeeId", label: "Employee ID" },
    { key: "name", label: "Name" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "date", label: "Date" },
    { key: "assignedShift", label: "Assigned Shift" },
    { key: "workingShift", label: "Working Shift" },
    { key: "firstPunchIn", label: "First Punch IN" },
    { key: "lastPunchOut", label: "Last Punch Out" },
    { key: "otWorkedHours", label: "OT Worked Hours" },
    { key: "performedHours", label: "Performed Hours" },
    { key: "totalHours", label: "Total Hours" },
  ];

  // Apply pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = displayReports.slice(startIndex, startIndex + itemsPerPage);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading attendance reports...</span>
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
        data={paginatedData}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const AttendanceReportPage: React.FC = () => {
  const handleFilterChange = (filters: any) => {
    console.log("Attendance report filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("Attendance report search query:", query);
  };

  const handleRefresh = () => {
    console.log("Attendance report refresh clicked");
  };

  // Filter configuration for attendance reports
  const attendanceReportFilterConfig: FilterConfig = {
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
        {/* Filters Section */}
        <div className="mb-6">
          <CommonFilters 
            config={attendanceReportFilterConfig} 
            showTopFilters={true} 
          />
        </div>

        {/* Attendance Reports Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Attendance Report
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                All users daily attendance with shift time, total hours and OT hours.
              </p>
            </div>
          </div>

          <AttendanceReportTable attendanceReports={[]} />
        </div>
      </div>
    </AnalyzeLayout>
  );
};

export default AttendanceReportPage;