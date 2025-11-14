// components/analyzeDetail/overtimeReportPage.tsx
import React, { useState } from "react";
import AnalyzeLayout from "../AnalyzeLayout";
import CommonFilters, { FilterConfig } from "../../filtersDetails/filters";
import TableComponent from "@/components/common/TableComponent";
import { Button } from "@/components/ui/button";

export interface OvertimeReport {
  id: string;
  name: string;
  date: string;
  otRequestHour: string;
  otWorkedHours: string;
  status: "Approved" | "Pending" | "Rejected";
  rejectedReason: string;
}

// Mock data based on your screenshot
export const defaultOvertimeReports: OvertimeReport[] = [
  {
    id: "1",
    name: "Rajarajeswari",
    date: "06-11-2025",
    otRequestHour: "3 a.m.",
    otWorkedHours: "None",
    status: "Rejected",
    rejectedReason: "Reject reason",
  },
  {
    id: "2",
    name: "Abinash Kumar",
    date: "06-11-2025",
    otRequestHour: "2 a.m.",
    otWorkedHours: "1.5",
    status: "Approved",
    rejectedReason: "-",
  },
  {
    id: "3",
    name: "Ashok Patel",
    date: "06-11-2025",
    otRequestHour: "4 a.m.",
    otWorkedHours: "3.0",
    status: "Approved",
    rejectedReason: "-",
  },
  {
    id: "4",
    name: "Priya Sharma",
    date: "07-11-2025",
    otRequestHour: "2 a.m.",
    otWorkedHours: "None",
    status: "Pending",
    rejectedReason: "-",
  },
  {
    id: "5",
    name: "Vikram Singh",
    date: "07-11-2025",
    otRequestHour: "3 a.m.",
    otWorkedHours: "2.5",
    status: "Approved",
    rejectedReason: "-",
  },
  {
    id: "6",
    name: "Neha Gupta",
    date: "08-11-2025",
    otRequestHour: "1 a.m.",
    otWorkedHours: "None",
    status: "Rejected",
    rejectedReason: "Insufficient work load",
  },
  {
    id: "7",
    name: "Rajesh Kumar",
    date: "08-11-2025",
    otRequestHour: "2 a.m.",
    otWorkedHours: "1.0",
    status: "Approved",
    rejectedReason: "-",
  },
  {
    id: "8",
    name: "Sugan Raj",
    date: "09-11-2025",
    otRequestHour: "4 a.m.",
    otWorkedHours: "None",
    status: "Pending",
    rejectedReason: "-",
  },
  {
    id: "9",
    name: "Akash Singh",
    date: "09-11-2025",
    otRequestHour: "3 a.m.",
    otWorkedHours: "2.0",
    status: "Approved",
    rejectedReason: "-",
  },
  {
    id: "10",
    name: "Kumar Reddy",
    date: "10-11-2025",
    otRequestHour: "2 a.m.",
    otWorkedHours: "None",
    status: "Rejected",
    rejectedReason: "Project deadline extended",
  },
  {
    id: "11",
    name: "Ravi Shankar",
    date: "10-11-2025",
    otRequestHour: "1 a.m.",
    otWorkedHours: "0.5",
    status: "Approved",
    rejectedReason: "-",
  },
  {
    id: "12",
    name: "Meena Kumari",
    date: "11-11-2025",
    otRequestHour: "3 a.m.",
    otWorkedHours: "None",
    status: "Pending",
    rejectedReason: "-",
  },
];

// Table Actions Component
const TableActions: React.FC<{
  selectedTasks: Set<number>;
  onApprove: () => void;
  onReject: () => void;
}> = ({ selectedTasks, onApprove, onReject }) => (
  <div className="flex justify-end items-center gap-4 mt-4">
    <Button
      className={`bg-green-600 text-white font-semibold px-6 py-2 rounded-xl transition-all ${
        selectedTasks.size === 0
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-green-700"
      }`}
      disabled={selectedTasks.size === 0}
      onClick={onApprove}
    >
      Approve
    </Button>
    <Button
      className={`bg-red-600 text-white font-semibold px-6 py-2 rounded-xl transition-all ${
        selectedTasks.size === 0
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-red-700"
      }`}
      disabled={selectedTasks.size === 0}
      onClick={onReject}
    >
      Reject
    </Button>
  </div>
);

interface OvertimeReportTableProps {
  overtimeReports?: OvertimeReport[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  selectedRows?: Set<number>;
  onRowSelect?: (index: number, total: number) => void;
  onSelectAll?: (total: number) => void;
  selectAll?: boolean;
}

const OvertimeReportTable: React.FC<OvertimeReportTableProps> = ({
  overtimeReports = [],
  loading = false,
  error = null,
  onRetry,
  selectedRows = new Set<number>(),
  onRowSelect,
  onSelectAll,
  selectAll = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const displayReports =
    overtimeReports.length > 0 ? overtimeReports : defaultOvertimeReports;
  const totalPages = Math.ceil(displayReports.length / itemsPerPage);

  // Define table columns with proper structure
  const columns = [
    {
      key: "name",
      label: "Select Name",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "otRequestHour",
      label: "OT Request Hour",
    },
    {
      key: "otWorkedHours",
      label: "OT Worked Hours",
    },
    {
      key: "status",
      label: "Status",
      render: (row: OvertimeReport) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Approved"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : row.status === "Pending"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "rejectedReason",
      label: "Rejected Reason",
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Loading overtime reports...
          </span>
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
        tableId="overtime-reports-table"
        columns={columns}
        data={displayReports}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        selectable={true}
        selectAll={selectAll}
        selectedRows={selectedRows}
        onSelectAll={onSelectAll}
        onRowSelect={onRowSelect}
      />
    </div>
  );
};

// Main Actions Component (to be placed after filters)
const MainActions: React.FC<{
  selectedTasks: Set<number>;
  onApprove: () => void;
  onReject: () => void;
}> = ({ selectedTasks, onApprove, onReject }) => (
  <div className="flex justify-end items-center gap-4 mb-6">
    <Button
      className={`bg-green-600 text-white font-semibold px-6 py-2 rounded-xl transition-all ${
        selectedTasks.size === 0
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-green-700"
      }`}
      disabled={selectedTasks.size === 0}
      onClick={onApprove}
    >
      Approve Selected
    </Button>
    <Button
      className={`bg-red-600 text-white font-semibold px-6 py-2 rounded-xl transition-all ${
        selectedTasks.size === 0
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-red-700"
      }`}
      disabled={selectedTasks.size === 0}
      onClick={onReject}
    >
      Reject Selected
    </Button>
  </div>
);

const OvertimeReportPage: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (total: number) => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      const allIndexes = new Set(Array.from({ length: total }, (_, i) => i));
      setSelectedRows(allIndexes);
      setSelectAll(true);
    }
  };

  const handleRowSelect = (index: number, total: number) => {
    const updated = new Set(selectedRows);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    setSelectedRows(updated);

    if (updated.size === total) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  const handleApprove = () => {
    const selectedReportIds = Array.from(selectedRows)
      .map((index) => defaultOvertimeReports[index]?.id)
      .filter(Boolean);

    const selectedReports = defaultOvertimeReports.filter((_, index) =>
      selectedRows.has(index)
    );

    console.log("Approved overtime reports:", selectedReportIds);

    alert(
      `Approved ${selectedReports.length} overtime request(s): ${selectedReports
        .map((r) => r.name)
        .join(", ")}`
    );

    // Reset selection after action
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const handleReject = () => {
    const selectedReportIds = Array.from(selectedRows)
      .map((index) => defaultOvertimeReports[index]?.id)
      .filter(Boolean);

    const selectedReports = defaultOvertimeReports.filter((_, index) =>
      selectedRows.has(index)
    );

    console.log("Rejected overtime reports:", selectedReportIds);

    alert(
      `Rejected ${selectedReports.length} overtime request(s): ${selectedReports
        .map((r) => r.name)
        .join(", ")}`
    );

    // Reset selection after action
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const handleFilterChange = (filters: any) => {
    console.log("Overtime report filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("Overtime report search query:", query);
  };

  const handleRefresh = () => {
    console.log("Overtime report refresh clicked");
    // Reset selections on refresh
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  // Filter configuration for overtime reports
  const overtimeReportFilterConfig: FilterConfig = {
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
        {/* Header Section
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Overtime Report
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            All users tracking overtime detail in one place.
          </p>
        </div> */}

        {/* Filters Section */}
        <div className="mb-6">
          <CommonFilters
            config={overtimeReportFilterConfig}
            showTopFilters={true}
          />
        </div>

        {/* Overtime Reports Table Section */}
        <div className="bg-white  dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-7">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Overtime Request Report
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Detailed overtime requests with approval status and reasons
              </p>
            </div>
             <div className=" flex flex-col gap-3">
            {/* <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedRows.size > 0
                ? `Selected: ${selectedRows.size} items`
                : "No items selected"}
            </div> */}
            {/* Main Actions - Approve/Reject Buttons after filters */}
            <MainActions
              selectedTasks={selectedRows}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </div>
          </div>

         

          <OvertimeReportTable
            overtimeReports={defaultOvertimeReports}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
            selectAll={selectAll}
          />
        </div>
      </div>
    </AnalyzeLayout>
  );
};

export default OvertimeReportPage;
