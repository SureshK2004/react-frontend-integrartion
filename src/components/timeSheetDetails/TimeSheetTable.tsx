import React, { useState } from "react";
import { Eye } from "lucide-react";
import TableComponent from "../common/TableComponent";
import { Button } from "../ui/button";

export interface TimeSheet {
  id: string;
  employeeId: string;
  name: string;
  project: string;
  date: string;
  startTime: string;
  endTime: string;
  hoursWorked: string;
  description: string;
}

interface TimeSheetTableProps {
  timeSheets?: TimeSheet[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  renderActionColumn?: (sheet: TimeSheet, index: number) => React.ReactNode;
  actionColumnHeader?: string;
  onViewDetails?: (sheet: TimeSheet) => void;
}

export const defaultTimeSheets: TimeSheet[] = [
  { id: "1", employeeId: "DM001", name: "Abinash", project: "Project A", date: "2025-10-27", hoursWorked: "8h 15m", startTime: "09:15 AM", endTime: "06:30 PM", description: "Add Dropdown" },
  { id: "2", employeeId: "DM002", name: "Ashok", project: "Project B", date: "2025-10-26", hoursWorked: "7h 45m", startTime: "09:15 AM", endTime: "06:30 PM", description: "Add Input Box" },
  { id: "3", employeeId: "DM003", name: "Akash", project: "Project C", date: "2025-10-25", hoursWorked: "0h 0m", startTime: "09:15 AM", endTime: "06:30 PM", description: "Add TimeSheet Dashboard" },
  { id: "4", employeeId: "DM004", name: "Kumar", project: "Project A", date: "2025-10-24", hoursWorked: "9h 0m", startTime: "09:15 AM", endTime: "06:30 PM", description: "Add live Tracking" },
  { id: "5", employeeId: "DM005", name: "Sugan", project: "Project D", date: "2025-10-23", hoursWorked: "8h 30m", startTime: "09:15 AM", endTime: "06:30 PM", description: "Add assign-users" },
  { id: "6", employeeId: "DM006", name: "Sangeetha", project: "Project D", date: "2025-10-23", hoursWorked: "8h 30m", startTime: "09:15 AM", endTime: "06:30 PM", description: "Add assign-users" },
];

const columns = [
  { key: "id", label: "S.No" },
  { key: "employeeId", label: "EmployeeId" },
  { key: "name", label: "Name" },
  { key: "project", label: "Project" },
  { key: "hoursWorked", label: "Hours" },
  { key: "startTime", label: "StartTime" },
  { key: "endTime", label: "EndTime" },
  { key: "date", label: "Date" },
  { key: "actions", label: "Actions" },
];

const TimeSheetTable: React.FC<TimeSheetTableProps> = ({
  timeSheets = [],
  loading = false,
  error = null,
  onRetry,
  renderActionColumn,
  onViewDetails,
}) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const displaySheets = (timeSheets && timeSheets.length > 0) ? timeSheets : defaultTimeSheets;
  const totalPages = Math.ceil(displaySheets.length / itemsPerPage);

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading time sheets...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8 text-center">
        <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
        {onRetry && (
          <button onClick={onRetry} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Retry</button>
        )}
      </div>
    );
  }

  const renderActions = (row: TimeSheet) => (
    <div className="flex items-center gap-2">
      <Button
        variant="gost"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => onViewDetails?.(row)} // pass whole row and use optional chaining
      >
        <Eye className="w-4 h-4 text-blue-800" />
      </Button>
    </div>
  );

  const tableData = displaySheets.map((d) => ({
    ...d,
    actions: renderActionColumn ? undefined : renderActions(d),
  }));

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <TableComponent
          tableId="timesheet-table"
          columns={columns}
          data={tableData}
          currentPage={page}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default TimeSheetTable;
