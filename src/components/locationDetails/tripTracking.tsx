// components/TripTracking.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LocationLayout from "./locationLayout";
import ExportComponent from "../exportOption/exportTo";
import CommonFilters, { FilterConfig } from "../filtersDetails/filters";
import { ArrowUpDown, MapPin, Clock, Eye } from "lucide-react";

export interface Trip {
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

export const defaultTrips: Trip[] = [
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
  },
];

const TripTrackingTable: React.FC<{ trips: Trip[] }> = ({ trips = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const displayTrips = trips.length > 0 ? trips : defaultTrips;
  const totalPages = Math.ceil(displayTrips.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTrips = displayTrips.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const columns = [
    { key: "employeeId", label: "Employee ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "startTime", label: "Start Time", sortable: true },
    { key: "endTime", label: "End Time", sortable: true },
    { key: "distance", label: "Distance", sortable: true },
    { key: "viewDistance", label: "View Distance", sortable: false },
    { key: "viewTrip", label: "View Trip", sortable: false },
  ];

  const ViewDistanceButton = ({ tripId }: { tripId: string }) => (
    <button className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
      <MapPin className="w-4 h-4" />
      <span>{tripId}</span>
    </button>
  );

  const ViewTripButton = () => (
    <button
      onClick={() => navigate("/manage/trip-details")}
      className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
    >
      <Eye className="w-4 h-4" />
      <span>View</span>
    </button>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="overflow-x-auto">
        <table
          id="trip-tracking-table"
          className="min-w-full"
          style={{ minWidth: "140%" }}
        >
          <thead>
            <tr className="bg-primary">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-white whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <ArrowUpDown className="w-4 h-4 text-white opacity-90" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedTrips.map((trip) => (
              <tr
                key={trip.id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {trip.employeeId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${trip.avatarColor} flex items-center justify-center text-white font-semibold text-sm shadow-md`}
                    >
                      {trip.avatar}
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {trip.name}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">
                  {trip.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {trip.startTime}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {trip.endTime}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-500 text-white text-sm font-semibold rounded-full shadow-sm">
                    {trip.distance}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ViewDistanceButton tripId={trip.id} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ViewTripButton />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, displayTrips.length)} of{" "}
            {displayTrips.length} trips
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 1
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm ${
                  currentPage === page
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow-md"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const TripTracking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleFilterChange = (filters: any) => {
    console.log("Trip filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("Trip search query:", query);
  };

  const handleRefresh = () => {
    console.log("Trip refresh clicked");
  };

  const tripFilterConfig: FilterConfig = {
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
      searchPlaceholder: "Search trips",
    },
  };

  return (
    <LocationLayout>
      <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <CommonFilters config={tripFilterConfig} showTopFilters={true} />

        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Trip Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor all active trips and track employee movements in
                real-time
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/manage/tripTranckingMapView")}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <MapPin className="w-4 h-4" />
                Map View
              </button>
              <ExportComponent
                tableId="trip-tracking-table"
                filename="trip_tracking"
              />
            </div>
          </div>

          <TripTrackingTable trips={[]} />
        </div>
      </div>
    </LocationLayout>
  );
};
