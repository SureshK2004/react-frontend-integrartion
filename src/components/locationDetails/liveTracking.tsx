// components/LiveTracking.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LocationLayout from "./locationLayout";
import ExportComponent from "../exportOption/exportTo";
import CommonFilters, { FilterConfig } from "../filtersDetails/filters";
import TableComponent from "@/components/common/TableComponent";
import { MapPin, Clock, Eye } from "lucide-react";

export interface LiveTrip {
  id: string;
  employeeId: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  distance: string;
  status: "Active" | "Completed" | "Cancelled";
  avatar: string;
  avatarColor: string;
}

export const defaultTrips: LiveTrip[] = [
  {
    id: "1",
    employeeId: "DM 0001",
    name: "Abinash Kumar",
    date: "22-10-2025",
    startTime: "09:30 AM",
    endTime: "05:45 PM",
    distance: "45.2 km",
    status: "Active",
    avatar: "A",
    avatarColor: "bg-green-500",
  },
  {
    id: "2",
    employeeId: "DM 0002",
    name: "Ashok Patel",
    date: "22-10-2025",
    startTime: "08:15 AM",
    endTime: "04:30 PM",
    distance: "32.8 km",
    status: "Completed",
    avatar: "A",
    avatarColor: "bg-orange-500",
  },
  {
    id: "3",
    employeeId: "DM 0003",
    name: "Akash Singh",
    date: "22-10-2025",
    startTime: "10:00 AM",
    endTime: "06:20 PM",
    distance: "67.5 km",
    status: "Active",
    avatar: "A",
    avatarColor: "bg-blue-500",
  },
  {
    id: "4",
    employeeId: "DM 0004",
    name: "Kumar Reddy",
    date: "22-10-2025",
    startTime: "07:45 AM",
    endTime: "03:15 PM",
    distance: "28.1 km",
    status: "Completed",
    avatar: "K",
    avatarColor: "bg-purple-500",
  },
  {
    id: "5",
    employeeId: "DM 0005",
    name: "Sugan Raj",
    date: "22-10-2025",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    distance: "52.3 km",
    status: "Cancelled",
    avatar: "S",
    avatarColor: "bg-yellow-500",
  },
  {
    id: "6",
    employeeId: "DM 0006",
    name: "Ravi Shankar",
    date: "22-10-2025",
    startTime: "08:30 AM",
    endTime: "04:45 PM",
    distance: "41.7 km",
    status: "Active",
    avatar: "R",
    avatarColor: "bg-teal-500",
  }
];

interface LiveTrackingTableProps {
  liveTrips?: LiveTrip[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const LiveTrackingTable: React.FC<LiveTrackingTableProps> = ({
  liveTrips = [],
  loading = false,
  error = null,
  onRetry,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const displayTrips = liveTrips.length > 0 ? liveTrips : defaultTrips;
  const totalPages = Math.ceil(displayTrips.length / itemsPerPage);

  
  const columns = [
    { key: "employeeId", label: "Employee ID" },
    { key: "name", label: "Name" },
    { key: "date", label: "Date" },
    { key: "startTime", label: "Start Time" },
    { key: "endTime", label: "End Time" },
    { key: "distance", label: "Distance" },
    { key: "viewDistance", label: "View Distance" },
    { key: "viewTrip", label: "View Trip" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading trips...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8 text-center">
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

  // Render functions 
  const renderViewDistance = (row: LiveTrip) => (
    <button className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md">
      <MapPin className="w-4 h-4" />
      <span>{row.id}</span>
    </button>
  );

  const renderViewTrip = (row: LiveTrip) => (
    <button
      onClick={() => navigate("/manage/trip-details", { state: { trip: row } })}
      className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <Eye className="w-4 h-4" />
      <span>View Trip</span>
    </button>
  );

  
  const tableData = displayTrips.map((trip) => ({
    ...trip, // Keep all original data
    viewDistance: renderViewDistance(trip),
    viewTrip: renderViewTrip(trip),
  }));

  return (
    <div className="bg-gray-50 p-4 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <TableComponent
        tableId="trip-tracking-table"
        columns={columns}
        data={tableData}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export const LiveTracking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleFilterChange = (filters: any) => {
    console.log("live filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("live search query:", query);
  };

  const handleRefresh = () => {
    console.log("live refresh clicked");
  };

  const liveFilterConfig: FilterConfig = {
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
      searchPlaceholder: "Search Location",
    },
  };

  return (
    <LocationLayout>
      <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <CommonFilters config={liveFilterConfig} showTopFilters={true} />

        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Location Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor all active trips and track employee movements in real-time
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/manage/tripTranckingMapView")}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <MapPin className="w-4 h-4" />
                Map View
              </button>
              {/* <ExportComponent
                tableId="trip-tracking-table"
                filename="trip_tracking"
              /> */}
            </div>
          </div>

          <LiveTrackingTable liveTrips={[]} />
        </div>
      </div>
    </LocationLayout>
  );
};

export default LiveTracking;