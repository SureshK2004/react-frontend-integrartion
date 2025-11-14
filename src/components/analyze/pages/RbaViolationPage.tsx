// components/analyzeDetail/rbaViolationPage.tsx
import React, { useState } from 'react';
import AnalyzeLayout from '../AnalyzeLayout';
import CommonFilters, { FilterConfig } from '../../filtersDetails/filters';
import TableComponent from '@/components/common/TableComponent';


export interface RbaViolation {
  id: string;
  sno: number;
  fullName: string;
  empId: string;
  punchType: string;
  date: string;
  time: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  violationType: string;
  approvedBy: string;
}

// Mock data based on your columns
export const defaultRbaViolations: RbaViolation[] = [
  {
    id: "1",
    sno: 1,
    fullName: "Rajarajeswari",
    empId: "EMP001",
    punchType: "Punch In",
    date: "06-11-2025",
    time: "09:15:30",
    reason: "Late arrival due to traffic",
    status: "Pending",
    violationType: "Late Punch",
    approvedBy: "-",
  },
  {
    id: "2",
    sno: 2,
    fullName: "Abinash Kumar",
    empId: "EMP002",
    punchType: "Punch Out",
    date: "06-11-2025",
    time: "17:45:20",
    reason: "Early departure for personal work",
    status: "Rejected",
    violationType: "Early Departure",
    approvedBy: "Manager",
  },
  {
    id: "3",
    sno: 3,
    fullName: "Ashok Patel",
    empId: "EMP003",
    punchType: "Punch In",
    date: "06-11-2025",
    time: "08:55:10",
    reason: "Forgot to punch",
    status: "Approved",
    violationType: "Missed Punch",
    approvedBy: "Supervisor",
  },
  {
    id: "4",
    sno: 4,
    fullName: "Priya Sharma",
    empId: "EMP004",
    punchType: "Punch Out",
    date: "07-11-2025",
    time: "18:30:45",
    reason: "System error",
    status: "Approved",
    violationType: "Technical Issue",
    approvedBy: "IT Admin",
  },
  {
    id: "5",
    sno: 5,
    fullName: "Vikram Singh",
    empId: "EMP005",
    punchType: "Punch In",
    date: "07-11-2025",
    time: "10:20:15",
    reason: "Medical appointment",
    status: "Pending",
    violationType: "Late Punch",
    approvedBy: "-",
  },
  {
    id: "6",
    sno: 6,
    fullName: "Neha Gupta",
    empId: "EMP006",
    punchType: "Punch Out",
    date: "08-11-2025",
    time: "16:15:00",
    reason: "Emergency leave",
    status: "Approved",
    violationType: "Early Departure",
    approvedBy: "HR Manager",
  },
  {
    id: "7",
    sno: 7,
    fullName: "Rajesh Kumar",
    empId: "EMP007",
    punchType: "Punch In",
    date: "08-11-2025",
    time: "09:05:25",
    reason: "Transport delay",
    status: "Rejected",
    violationType: "Late Punch",
    approvedBy: "Team Lead",
  },
  {
    id: "8",
    sno: 8,
    fullName: "Sugan Raj",
    empId: "EMP008",
    punchType: "Punch Out",
    date: "09-11-2025",
    time: "19:20:30",
    reason: "Overtime work",
    status: "Approved",
    violationType: "Extended Hours",
    approvedBy: "Project Manager",
  },
  {
    id: "9",
    sno: 9,
    fullName: "Akash Singh",
    empId: "EMP009",
    punchType: "Punch In",
    date: "09-11-2025",
    time: "08:45:50",
    reason: "Forgot to punch",
    status: "Pending",
    violationType: "Missed Punch",
    approvedBy: "-",
  },
  {
    id: "10",
    sno: 10,
    fullName: "Kumar Reddy",
    empId: "EMP010",
    punchType: "Punch Out",
    date: "10-11-2025",
    time: "17:00:15",
    reason: "Client meeting outside",
    status: "Approved",
    violationType: "Early Departure",
    approvedBy: "Sales Head",
  },
  {
    id: "11",
    sno: 11,
    fullName: "Ravi Shankar",
    empId: "EMP011",
    punchType: "Punch In",
    date: "10-11-2025",
    time: "09:25:40",
    reason: "Vehicle breakdown",
    status: "Approved",
    violationType: "Late Punch",
    approvedBy: "Operations Manager",
  },
  {
    id: "12",
    sno: 12,
    fullName: "Meena Kumari",
    empId: "EMP012",
    punchType: "Punch Out",
    date: "11-11-2025",
    time: "18:45:20",
    reason: "System network issue",
    status: "Pending",
    violationType: "Technical Issue",
    approvedBy: "-",
  }
];

interface RbaViolationTableProps {
  rbaViolations?: RbaViolation[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const RbaViolationTable: React.FC<RbaViolationTableProps> = ({
  rbaViolations = [],
  loading = false,
  error = null,
  onRetry,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const displayViolations = rbaViolations.length > 0 ? rbaViolations : defaultRbaViolations;
  const totalPages = Math.ceil(displayViolations.length / itemsPerPage);

  // Define table columns based on your provided structure
  const columns = [
    { key: "sno", label: "S.NO" },
    { key: "fullName", label: "FULL NAME" },
    { key: "empId", label: "EMP ID" },
    { key: "punchType", label: "PUNCH TYPE" },
    { key: "date", label: "DATE" },
    { key: "time", label: "TIME" },
    { key: "reason", label: "REASON" },
    { key: "status", label: "STATUS" },
    { key: "violationType", label: "VIOLATION TYPE" },
    { key: "approvedBy", label: "APPROVED BY" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading RBA violations...</span>
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
        tableId="rba-violations-table"
        columns={columns}
        data={displayViolations}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const RbaViolationPage: React.FC = () => {
  const handleFilterChange = (filters: any) => {
    console.log("RBA violation filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("RBA violation search query:", query);
  };

  const handleRefresh = () => {
    console.log("RBA violation refresh clicked");
  };

  // Filter configuration for RBA violations
  const rbaViolationFilterConfig: FilterConfig = {
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
            RBA Violation Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            All users RBA violation details in one place.
          </p>
        </div> */}

        {/* Filters Section */}
        <div className="mb-6">
          <CommonFilters 
            config={rbaViolationFilterConfig} 
            showTopFilters={true} 
          />
        </div>

        {/* RBA Violations Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Rule-Based Attendance Violations
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Detailed RBA violation records with approval status and reasons
              </p>
            </div>
            {/* <div className="flex items-center gap-3">
              <ExportComponent
                tableId="rba-violations-table"
                filename="rba_violations_report"
                sheetName="RBA Violations"
              />
            </div> */}
          </div>

          <RbaViolationTable rbaViolations={[]} />
        </div>
      </div>
    </AnalyzeLayout>
  );
};

export default RbaViolationPage;