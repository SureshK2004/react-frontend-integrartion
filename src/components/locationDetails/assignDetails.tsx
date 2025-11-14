// components/AssignDetails.tsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LocationLayout from "./locationLayout";
import ExportComponent from "../exportOption/exportTo";
import CommonFilters, { FilterConfig } from "../filtersDetails/filters";
import TableComponent from "../common/TableComponent";
import { Edit, Trash2 } from "lucide-react";

export interface AssignUser {
  id: string;
  employeeId: string;
  name: string;
  assignFrom: string;
  assignTo: string;
  selectedFrom: string;
  project: string;
  location: string;
  coordinateName: string;
  avatar: string;
  avatarColor: string;
  status: "Assigned" | "Pending" | "Completed";
}

// Move static data outside component
export const defaultUsers: AssignUser[] = [
  {
    id: "1",
    employeeId: "DM 0001",
    name: "Abinash Kumar",
    assignFrom: "22-10-2025",
    assignTo: "25-10-2025",
    selectedFrom: "Master",
    project: "Project A",
    location: "Bangalore",
    coordinateName: "John Doe",
    avatar: "A",
    avatarColor: "bg-green-500",
    status: "Assigned",
  },
  {
    id: "2",
    employeeId: "DM 0002",
    name: "Ashok Patel",
    assignFrom: "23-10-2025",
    assignTo: "26-10-2025",
    selectedFrom: "Master",
    project: "Project B",
    location: "Mumbai",
    coordinateName: "Jane Doe",
    avatar: "A",
    avatarColor: "bg-orange-500",
    status: "Pending",
  },
  {
    id: "3",
    employeeId: "DM 0003",
    name: "Akash Singh",
    assignFrom: "24-10-2025",
    assignTo: "27-10-2025",
    selectedFrom: "Master",
    project: "Project C",
    location: "Delhi",
    coordinateName: "Mike Ross",
    avatar: "A",
    avatarColor: "bg-blue-500",
    status: "Assigned",
  },
  {
    id: "4",
    employeeId: "DM 0004",
    name: "Kumar Reddy",
    assignFrom: "25-10-2025",
    assignTo: "28-10-2025",
    selectedFrom: "Master",
    project: "Project D",
    location: "Chennai",
    coordinateName: "Sarah Wilson",
    avatar: "K",
    avatarColor: "bg-purple-500",
    status: "Completed",
  },
  {
    id: "5",
    employeeId: "DM 0005",
    name: "Sugan Raj",
    assignFrom: "26-10-2025",
    assignTo: "29-10-2025",
    selectedFrom: "Master",
    project: "Project E",
    location: "Hyderabad",
    coordinateName: "David Brown",
    avatar: "S",
    avatarColor: "bg-teal-500",
    status: "Assigned",
  },
];

interface AssignTableProps {
  users?: AssignUser[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  activeTab?: "all" | "assigned" | "unassigned";
  onDelete?: (id: string) => void;
}

// Separate table component
const AssignTable: React.FC<AssignTableProps> = ({
  users = [],
  loading = false,
  error = null,
  onRetry,
  activeTab = "all",
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const displayUsers = users.length > 0 ? users : defaultUsers;
  const totalPages = Math.ceil(displayUsers.length / itemsPerPage);

  // Define columns
  const columns = useMemo(
    () => [
      { key: "employeeId", label: "Employee ID" },
      { key: "name", label: "Name" },
      { key: "assignFrom", label: "Assign From" },
      { key: "assignTo", label: "Assign To" },
      { key: "selectedFrom", label: "Selected From" },
      { key: "project", label: "Project" },
      { key: "location", label: "Location" },
      { key: "coordinateName", label: "Coordinate Name" },
      { key: "status", label: "Status" },
      { key: "actions", label: "Actions" },
    ],
    []
  );

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

  // Render functions
  const renderName = (row: AssignUser) => (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full ${row.avatarColor} flex items-center justify-center text-white font-semibold text-sm shadow-md`}>
        {row.avatar}
      </div>
      <p className="font-medium text-gray-900 dark:text-white">{row.name}</p>
    </div>
  );

  const renderStatus = (row: AssignUser) => (
    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
      row.status === "Assigned" ? "bg-green-400 text-white" :
      row.status === "Pending" ? "bg-yellow-400 text-white" :
      "bg-blue-400 text-white"
    }`}>
      {row.status}
    </span>
  );

  const renderActions = (row: AssignUser) => (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => navigate(`/manage/assign-edit/${row.id}`)}
        className="px-3 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-1 hover:bg-blue-600 transition-colors"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button 
        onClick={() => onDelete?.(row.id)}
        className="px-3 py-2 bg-red-500 text-white rounded-lg flex items-center gap-1 hover:bg-red-600 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  // Transform data for TableComponent
  const tableData = displayUsers.map((user) => ({
    ...user,
    name: renderName(user),
    status: renderStatus(user),
    actions: renderActions(user),
  }));

  return (
    <div className="bg-gray-50 p-4 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <TableComponent
        tableId="assign-table"
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

// Tabs component
const AssignTabs: React.FC<{
  activeTab: "all" | "assigned" | "unassigned";
  onTabChange: (tab: "all" | "assigned" | "unassigned") => void;
}> = ({ activeTab, onTabChange }) => (
  <div className="flex gap-2 mb-4">
    {["all", "assigned", "unassigned"].map(tab => (
      <button
        key={tab}
        onClick={() => onTabChange(tab as "all" | "assigned" | "unassigned")}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          activeTab === tab 
            ? "bg-primary text-white" 
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        {tab === "all" ? "All" : tab === "assigned" ? "Assigned User" : "Unassigned User"}
      </button>
    ))}
  </div>
);

// Main component
export const AssignDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "assigned" | "unassigned">("all");
  const [users, setUsers] = useState<AssignUser[]>(defaultUsers);

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleRefresh = () => {
    console.log("Refresh clicked");
  };

  const handleTabChange = (tab: "all" | "assigned" | "unassigned") => {
    setActiveTab(tab);
  };

  const filterConfig: FilterConfig = {
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
    labels: { searchPlaceholder: "Search User" },
  };

  // Filter users based on active tab
  const filteredUsers = useMemo(() => {
    if (activeTab === "assigned") return users.filter(u => u.status === "Assigned");
    if (activeTab === "unassigned") return users.filter(u => u.status !== "Assigned");
    return users;
  }, [activeTab, users]);

  return (
    <LocationLayout>
      <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <CommonFilters config={filterConfig} showTopFilters={true} />

        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Assign Details
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                View and manage user assignments in real-time
              </p>
            </div>
            {/* <div className="flex items-center gap-3">
              <ExportComponent tableId="assign-table" filename="assign_details" />
            </div> */}
          </div>

          {/* Tabs */}
          <AssignTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Assign Table */}
          <AssignTable 
            users={filteredUsers}
            activeTab={activeTab}
            onDelete={handleDeleteUser}
          />
        </div>
      </div>
    </LocationLayout>
  );
};

export default AssignDetails;