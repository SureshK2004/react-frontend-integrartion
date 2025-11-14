import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DepartmentChart from "./DepartmentChart";
import TableComponent from "../common/TableComponent";

// Move static data outside component
export const summaryData = [
  { title: "Total Users", value: 45, className: "bg-primary text-white" },
  {
    title: "Approved",
    value: "38/45",
    progress: 84,
    className: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    progressColor: "bg-green-500",
  },
  {
    title: "Pending",
    value: "29/45",
    progress: 64,
    className: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    progressColor: "bg-red-500",
  },
  {
    title: "In Progress",
    value: "39/45",
    progress: 87,
    className: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    progressColor: "bg-yellow-500",
  },
];

export const defaultTableData = [
  { user: "John Doe", total: 20, approved: 15, pending: 3, rejected: 2 },
  { user: "Jane Smith", total: 18, approved: 16, pending: 1, rejected: 1 },
  { user: "Amit Kumar", total: 25, approved: 20, pending: 3, rejected: 2 },
  { user: "Priya Verma", total: 12, approved: 10, pending: 2, rejected: 0 },
];

export interface UserTask {
  user: string;
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}

interface BestUsersTableProps {
  users?: UserTask[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  timeTab?: "weekly" | "monthly" | "yearly";
  searchQuery?: string;
}

// Separate table component
const BestUsersTable: React.FC<BestUsersTableProps> = ({
  users = [],
  loading = false,
  error = null,
  onRetry,
  timeTab = "weekly",
  searchQuery = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const displayUsers = users.length > 0 ? users : defaultTableData;

  // Define columns
  const columns = useMemo(
    () => [
      { key: "user", label: "User" },
      { key: "total", label: `Total Tasks [${timeTab}]` },
      { key: "approved", label: "Approved" },
      { key: "pending", label: "Pending" },
      { key: "rejected", label: "Rejected" },
    ],
    [timeTab]
  );

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return displayUsers;
    
    const query = searchQuery.toLowerCase();
    return displayUsers.filter(user => 
      user.user.toLowerCase().includes(query)
    );
  }, [displayUsers, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading users...</span>
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

  // Render functions for styled numbers
  const renderApproved = (row: UserTask) => (
    <span className="text-green-600 font-medium">{row.approved}</span>
  );

  const renderPending = (row: UserTask) => (
    <span className="text-yellow-600 font-medium">{row.pending}</span>
  );

  const renderRejected = (row: UserTask) => (
    <span className="text-red-600 font-medium">{row.rejected}</span>
  );

  // Transform data for TableComponent
  const tableData = filteredUsers.map((user) => ({
    ...user,
    approved: renderApproved(user),
    pending: renderPending(user),
    rejected: renderRejected(user),
  }));

  return (
    <div className="bg-gray-50 p-4 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <TableComponent
        tableId="best-users-table"
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

// Filter section component
const FilterSection: React.FC<{
  timeTab: "weekly" | "monthly" | "yearly";
}> = ({ timeTab }) => {
  const timeLabel = timeTab === "weekly" ? "Week" : timeTab === "monthly" ? "Month" : "Year";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 items-end">
      {/* Department Select */}
      <div>
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">
          Department
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hr">HR</SelectItem>
            <SelectItem value="it">IT</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Date Input */}
      <div>
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">
          {timeLabel}
        </label>

        {timeTab === "weekly" && (
          <input
            type="week"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        )}

        {timeTab === "monthly" && (
          <input
            type="month"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        )}

        {timeTab === "yearly" && (
          <input
            type="number"
            placeholder="Enter Year"
            min="2000"
            max="2100"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        )}
      </div>

      {/* Search Button */}
      <div className="flex justify-end sm:justify-start">
        <button className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all w-full sm:w-auto">
          Search
        </button>
      </div>
    </div>
  );
};

// Summary cards component
const SummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((item, index) => (
        <Card
          key={index}
          className={`transition-all duration-200 hover:shadow-md ${item.className}`}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <h3
                className={`text-sm font-medium ${
                  index === 0 ? "text-white" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-2xl font-bold mt-2 ${
                  index === 0 ? "text-white" : "text-gray-900 dark:text-white"
                }`}
              >
                {item.value}
              </p>
              {item.progress && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${item.progressColor}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Department chart component
const DepartmentChartSection: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Department Chart
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Task distribution by department
        </p>
        <div className="text-center py-10 border-t border-gray-200 dark:border-gray-700">
          <DepartmentChart
            data={[
              { name: "Approved", value: 38, color: "#22c55e" },
              { name: "Pending", value: 29, color: "#ef4444" },
              { name: "In Progress", value: 39, color: "#eab308" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

// Main dashboard component
const DashboardPage: React.FC = () => {
  const [timeTab, setTimeTab] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTimeTabChange = (value: string) => {
    setTimeTab(value as "weekly" | "monthly" | "yearly");
  };

  return (
    <div className="space-y-10">
      {/* Summary Cards */}
      <SummaryCards />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Best Users */}
        <div className="bg-gray-50 dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 space-y-4">
            {/* Header & Tabs */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Best Users
              </h3>
              <Tabs value={timeTab} onValueChange={handleTimeTabChange}>
                <TabsList className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                  <TabsTrigger value="weekly" className="text-sm rounded-lg px-3 py-1">
                    Weekly
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="text-sm rounded-lg px-3 py-1">
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger value="yearly" className="text-sm rounded-lg px-3 py-1">
                    Yearly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>

            {/* Filters */}
            <FilterSection timeTab={timeTab} />

            {/* Best Users Table */}
            <BestUsersTable 
              timeTab={timeTab}
              searchQuery={searchQuery}
            />
          </div>
        </div>

        {/* Right: Department Chart */}
        <DepartmentChartSection />
      </div>
    </div>
  );
};

export default DashboardPage;