import React, { useState } from 'react';
import CommonFilters, { FilterConfig } from '../filtersDetails/filters';
import TableComponent from '@/components/common/TableComponent';
import ActionLogLayout from './ActionLogLayout';

export interface ActionLogRecord {
  id: string;
  transactionId: string;
  loginName: string;
  username: string;
  empId: string;
  dateTime: string;
  status: string;
  type: string;
  action: string;
  comment: string;
  loginId: string;
  userId: string;
  geoLocation: string;
}

// Mock data 
export const defaultActionLogs: ActionLogRecord[] = [
 {
    id: "1",
    transactionId: "TXN3-08849",
    loginName: "KISHORE",
    username: "KISHORE",
    empId: "20",
    dateTime: "07-11-2025, 10:09 a.m.",
    status: "Success",
    type: "Login Start",
    action: "User loggedin",
    comment: "User login successfully",
    loginId: "134",
    userId: "134",
    geoLocation: "N/A",
  },
  {
    id: "2",
    transactionId: "TXN3-08850",
    loginName: "KISHORE",
    username: "KISHORE",
    empId: "20",
    dateTime: "07-11-2025, 10:10 a.m.",
    status: "Success",
    type: "Login Start",
    action: "User loggedin",
    comment: "User login successfully",
    loginId: "134",
    userId: "134",
    geoLocation: "N/A",
  },
  {
    id: "3",
    transactionId: "TXN3-08860",
    loginName: "ASHOK",
    username: "ASHOK",
    empId: "21",
    dateTime: "08-11-2025, 10:10 a.m.",
    status: "Success",
    type: "Login Start",
    action: "User loggedin",
    comment: "User login successfully",
    loginId: "135",
    userId: "135",
    geoLocation: "N/A",
  },
  {
    id: "4",
    transactionId: "TXN3-08861",
    loginName: "ASHOK",
    username: "ASHOK",
    empId: "21",
    dateTime: "08-11-2025, 10:11 a.m.",
    status: "Success",
    type: "Login Start",
    action: "User loggedin",
    comment: "User login successfully",
    loginId: "135",
    userId: "135",
    geoLocation: "N/A",
  },
  {
    id: "5",
    transactionId: "TXN3-08862",
    loginName: "ASHOK",
    username: "ASHOK",
    empId: "21",
    dateTime: "08-11-2025, 10:12 a.m.",
    status: "Success",
    type: "Login Start",
    action: "User loggedin",
    comment: "User login successfully",
    loginId: "135",
    userId: "135",
    geoLocation: "N/A",
  },
  {
    id: "6",
    transactionId: "TXN3-08863",
    loginName: "ASHOK",
    username: "ASHOK",
    empId: "21",
    dateTime: "08-11-2025, 10:13 a.m.",
    status: "Pending",
    type: "Login Start",
    action: "User loggedin",
    comment: "User login successfully",
    loginId: "135",
    userId: "135",
    geoLocation: "N/A",
  },
  {
    id: "7",
    transactionId: "TXN3-08864",
    loginName: "ASHOK",
    username: "ASHOK",
    empId: "21",
    dateTime: "08-11-2025, 10:14 a.m.",
    status: "Success",
    type: "Login Start",
    action: "User loggedin",
    comment: "User login successfully",
    loginId: "135",
    userId: "135",
    geoLocation: "N/A",
  },
  {
    id: "8",
    transactionId: "TXN3-08865",
    loginName: "RAJ",
    username: "RAJ",
    empId: "22",
    dateTime: "08-11-2025, 10:15 a.m.",
    status: "Pending",
    type: "Login Start",
    action: "User loggedin",
    comment: "User login successfully",
    loginId: "136",
    userId: "136",
    geoLocation: "N/A",
  },
  {
    id: "9",
    transactionId: "TXN3-08866",
    loginName: "RAJ",
    username: "RAJ",
    empId: "22",
    dateTime: "08-11-2025, 10:16 a.m.",
    status: "Success",
    type: "Login Start",
    action: "User loggedin",
    comment: "User login successfully",
    loginId: "136",
    userId: "136",
    geoLocation: "N/A",
  },
  {
    id: "10",
    transactionId: "TXN3-08867",
    loginName: "RAJ",
    username: "RAJ",
    empId: "22",
    dateTime: "08-11-2025, 10:17 a.m.",
    status: "Success",
    type: "Login Start",
    action: "User loggedin",
    comment: "User login successfully",
    loginId: "136",
    userId: "136",
    geoLocation: "N/A",
  },
  {
    id: "11",
    transactionId: "TXN3-08868",
    loginName: "RAJ",
    username: "RAJ",
    empId: "22",
    dateTime: "08-11-2025, 10:18 a.m.",
    status: "Success",
    type: "Login Start",
    action: "User loggedin",
    comment: "User login successfully",
    loginId: "136",
    userId: "136",
    geoLocation: "N/A",
  },
];

interface ActionLogTableProps {
  actionLogs?: ActionLogRecord[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const ActionLogTable: React.FC<ActionLogTableProps> = ({
  actionLogs = [],
  loading = false,
  error = null,
  onRetry,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const displayActionLogs = actionLogs.length > 0 ? actionLogs : defaultActionLogs;
  const totalPages = Math.ceil(displayActionLogs.length / itemsPerPage);

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Success":
      return "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded";
    case "Pending":
      return "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded";
    case "Failed":
      return "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded";
    default:
      return "bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-300 px-2 py-1 rounded";
  }
};

// Process data to add status styling
const processedData = displayActionLogs.map(log => ({
  ...log,
  status: (
    <span className={getStatusStyle(log.status)}>
      {log.status}
    </span>
  )
}));

  // Define table columns 
  const columns = [
    { key: "transactionId", label: "TRANSACTION ID" },
    { key: "loginName", label: "LOGIN NAME" },
    { key: "username", label: "USERNAME" },
    { key: "empId", label: "EMP ID" },
    { key: "dateTime", label: "DATE AND TIME" },
    { key: "status", label: "STATUS" },
    { key: "type", label: "TYPE" },
    { key: "action", label: "ACTION" },
    { key: "comment", label: "COMMENT" },
    { key: "loginId", label: "LOGIN ID" },
    { key: "userId", label: "USER ID" },
    { key: "geoLocation", label: "GEO LOCATION" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading action logs...</span>
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
        tableId="action-logs-table"
        columns={columns}
        data={processedData}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const ActionLog: React.FC = () => {
  const handleFilterChange = (filters: any) => {
    console.log("Action log filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("Action log search query:", query);
  };

  const handleRefresh = () => {
    console.log("Action log refresh clicked");
  };

  // Filter configuration for action logs
  const actionLogFilterConfig: FilterConfig = {
    showUserType: true,
    showDepartment: true,
    showZone: true,
    showBranch: true,
    showFromDate: true,
    showToDate: true,
    showFilterForm: true,
    showColumnSelector: true,
    showStatus: true,
    showTotalHours: false,
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
    <ActionLogLayout>
      <div className="p-4 sm:p-6 min-h-screen">
        {/* Filters Section */}
        <div className="mb-6">
          <CommonFilters 
            config={actionLogFilterConfig} 
            showTopFilters={true} 
          />
        </div>

        {/* Action Log Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Action Log Overview
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Detailed user action and login information
              </p>
            </div>
          </div>

          <ActionLogTable actionLogs={[]} />
        </div>
      </div>
    </ActionLogLayout>
  );
};

export default ActionLog;