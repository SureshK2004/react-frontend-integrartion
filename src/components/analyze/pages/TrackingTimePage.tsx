// components/analyzeDetail/trackingTimePage.tsx
import React, { useState } from 'react';
import AnalyzeLayout from '../AnalyzeLayout';
import CommonFilters, { FilterConfig } from '../../filtersDetails/filters';
import TableComponent from '@/components/common/TableComponent';


export interface TrackingTime {
  id: string;
  sno: number;
  employeeId: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  totalIdleTime: string;
  distance?: string;
}

// Mock data based on your screenshot
export const defaultTrackingTime: TrackingTime[] = [
  {
    id: "1",
    sno: 1,
    employeeId: "12",
    name: "John",
    date: "02-07-2025",
    startTime: "15:14:18",
    endTime: "15:15:08",
    totalIdleTime: "0km",
    distance: "0km",
  },
  {
    id: "2",
    sno: 2,
    employeeId: "13",
    name: "Abinash Kumar",
    date: "02-07-2025",
    startTime: "09:15:30",
    endTime: "17:45:20",
    totalIdleTime: "45m",
    distance: "12.5km",
  },
  {
    id: "3",
    sno: 3,
    employeeId: "14",
    name: "Ashok Patel",
    date: "02-07-2025",
    startTime: "08:30:15",
    endTime: "16:20:45",
    totalIdleTime: "1h 15m",
    distance: "8.2km",
  },
  {
    id: "4",
    sno: 4,
    employeeId: "15",
    name: "Priya Sharma",
    date: "02-07-2025",
    startTime: "10:00:00",
    endTime: "18:30:00",
    totalIdleTime: "30m",
    distance: "15.8km",
  },
  {
    id: "5",
    sno: 5,
    employeeId: "16",
    name: "Vikram Singh",
    date: "02-07-2025",
    startTime: "07:45:10",
    endTime: "15:55:25",
    totalIdleTime: "50m",
    distance: "22.3km",
  },
  {
    id: "6",
    sno: 6,
    employeeId: "17",
    name: "Neha Gupta",
    date: "02-07-2025",
    startTime: "09:20:05",
    endTime: "17:10:40",
    totalIdleTime: "1h 05m",
    distance: "9.7km",
  },
  {
    id: "7",
    sno: 7,
    employeeId: "18",
    name: "Rajesh Kumar",
    date: "02-07-2025",
    startTime: "08:15:30",
    endTime: "16:45:15",
    totalIdleTime: "25m",
    distance: "18.4km",
  },
  {
    id: "8",
    sno: 8,
    employeeId: "19",
    name: "Sugan Raj",
    date: "02-07-2025",
    startTime: "11:00:20",
    endTime: "19:20:50",
    totalIdleTime: "1h 40m",
    distance: "6.3km",
  },
  {
    id: "9",
    sno: 9,
    employeeId: "20",
    name: "Akash Singh",
    date: "02-07-2025",
    startTime: "08:45:00",
    endTime: "17:30:00",
    totalIdleTime: "55m",
    distance: "14.9km",
  },
  {
    id: "10",
    sno: 10,
    employeeId: "21",
    name: "Kumar Reddy",
    date: "02-07-2025",
    startTime: "09:05:15",
    endTime: "16:50:30",
    totalIdleTime: "1h 20m",
    distance: "11.2km",
  },
  {
    id: "11",
    sno: 11,
    employeeId: "22",
    name: "Ravi Shankar",
    date: "02-07-2025",
    startTime: "10:30:45",
    endTime: "18:15:20",
    totalIdleTime: "35m",
    distance: "7.8km",
  },
  {
    id: "12",
    sno: 12,
    employeeId: "23",
    name: "Meena Kumari",
    date: "02-07-2025",
    startTime: "08:00:00",
    endTime: "15:45:10",
    totalIdleTime: "1h 10m",
    distance: "20.1km",
  }
];

interface TrackingTimeTableProps {
  trackingData?: TrackingTime[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const TrackingTimeTable: React.FC<TrackingTimeTableProps> = ({
  trackingData = [],
  loading = false,
  error = null,
  onRetry,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const displayData = trackingData.length > 0 ? trackingData : defaultTrackingTime;
  const totalPages = Math.ceil(displayData.length / itemsPerPage);

  // Define table columns based on your screenshot
  const columns = [
    { key: "sno", label: "S.No" },
    { key: "employeeId", label: "Employee Id" },
    { key: "name", label: "Name" },
    { key: "date", label: "Date" },
    { key: "startTime", label: "Start Time" },
    { key: "endTime", label: "End Time" },
    { key: "totalIdleTime", label: "Total Idle Time" },
    { key: "distance", label: "Distance" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading tracking data...</span>
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
        tableId="tracking-time-table"
        columns={columns}
        data={displayData}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const TrackingTimePage: React.FC = () => {
  const handleFilterChange = (filters: any) => {
    console.log("Tracking time filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("Tracking time search query:", query);
  };

  const handleRefresh = () => {
    console.log("Tracking time refresh clicked");
  };

  // Filter configuration for tracking time
  const trackingTimeFilterConfig: FilterConfig = {
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
            Tracking Time Report
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            All users tracking time detail in one place.
          </p>
        </div> */}

        {/* Filters Section */}
        <div className="mb-6">
          <CommonFilters 
            config={trackingTimeFilterConfig} 
            showTopFilters={true} 
          />
        </div>

        {/* Tracking Time Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Employee Tracking Time
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Detailed tracking time with start time, end time and idle time information
              </p>
            </div>
            {/* <div className="flex items-center gap-3">
              <ExportComponent
                tableId="tracking-time-table"
                filename="tracking_time_report"
                sheetName="Tracking Time"
              />
            </div> */}
          </div>

          <TrackingTimeTable trackingData={[]} />
        </div>
      </div>
    </AnalyzeLayout>
  );
};

export default TrackingTimePage;