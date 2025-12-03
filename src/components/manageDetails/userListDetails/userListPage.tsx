// components/manageDetail/subPages/UserListPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import CommonFilters, { FilterConfig } from '@/components/filtersDetails/filters';
import UserTable from '@/components/userDetails/user';
import ExportComponent from '@/components/exportOption/exportTo';
import { User } from '@/components/userDetails/user';
import { defaultUsers } from '@/components/userDetails/user';
import UserListHead from './userListHead';

const UserListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLiveTracking, setIsLiveTracking] = useState<boolean>(false);

  // Fetch users data
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call - use default users for now
      setTimeout(() => {
        setUsers(defaultUsers);
      }, 500);
    } catch (err) {
      setError('Failed to fetch user data');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  // Handle Add User
  const handleAddUser = () => {
    console.log("Add User clicked");
    // Implement add user logic here
    // navigate('/add-user'); // Uncomment if you have an add user route
  };

  // Handle Live Tracking Toggle
  const handleLiveTrackingToggle = () => {
    setIsLiveTracking(!isLiveTracking);
    console.log(`Live tracking ${!isLiveTracking ? 'enabled' : 'disabled'}`);
    // Implement live tracking logic here
  };

  // Prepare export data
  const prepareExportData = () => {
    return users.map(user => ({
      Name: user.name,
      'Employee ID': user.employeeId,
      Date: user.date,
      Department: user.department,
      PU: user.pu,
      Status: user.status
    }));
  };

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    console.log("User filters changed:", filters);
    // Implement your filter logic here
  };

  // Handle search
  const handleSearch = (query: string) => {
    console.log("User search query:", query);
    // Implement search logic here
  };

  // Handle refresh
  const handleRefresh = () => {
    console.log("Refreshing user data...");
    fetchUsers();
  };

  // Filter configuration for user management
  const filterConfig: FilterConfig = {
    showUserType: true,        // User Name filter
    showDepartment: true,      // Department filter
    showZone: true,           // Zone filter
    showBranch: true,         // Branch filter
    showFromDate: true,       // From filter (date)
    showToDate: true,         // To filter (date)
    showFilterForm: true,     // Enable filter form modal
    showColumnSelector: true, // Enable column selector in modal
    showStatus: true,         // Status filter
    showTotalHours: true,     // Total hours filter
    showDesignation: true,    // Designation filter
    
    // Custom labels for user management
    labels: {
      userType: "User Name",
      department: "Department",
      zone: "Zone",
      branch: "Branch",
      from: "From Date",
      to: "To Date",
      filter: "Filter Users",
      searchPlaceholder: "Search users..."
    },
    
    // Options for dropdowns
    options: {
      userType: ["Akash", "Manoj", "Gokul", "John", "Doe", "Alice", "Bob"],
      department: ["Design", "Development", "Marketing", "HR", "Finance", "Operations"],
      zone: ["North", "South", "East", "West", "Central"],
      branch: ["Main Branch", "Downtown", "Uptown", "Suburban", "Rural"],
      status: ["Active", "Inactive", "Pending", "On Leave"],
      totalHours: ["4", "6", "8", "10", "12", "24"],
      designation: ["Manager", "Developer", "Designer", "HR", "Finance", "Admin"]
    },
    
    // Event handlers
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,
    
    // Initial filter values
    initialFilters: {
      department: "",
      status: "",
      zone: "",
      branch: "",
      fromDate: undefined,
      toDate: undefined,
      designation: ""
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header with Tabs */}
      <UserListHead />

      {/* Content based on active tab */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          {/* Add CommonFilters component */}
          <CommonFilters 
            config={filterConfig}
            showTopFilters={true}
          />
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Users List
              </h3>
            </div>
            
            {/* Action Buttons and Export Section */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Add User Button */}
              <button
                onClick={handleAddUser}
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add User
              </button>

              {/* Live Tracking Toggle Button */}
              <button
                onClick={handleLiveTrackingToggle}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isLiveTracking 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {isLiveTracking ? 'Disable Live Tracking' : 'Enable Live Tracking'}
              </button>

              {/* Export Section */}
              <ExportComponent
                tableId="user-management-table"
                filename="user_management"
                data={prepareExportData()}
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="mt-6">
            <UserTable
              users={users}
              loading={loading}
              error={error}
              onRetry={fetchUsers}
              mode="user"
            />
          </div>
        </div>
      {/* Footer */}
      {/* <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Copyright © 2021 Zazzali, thirdguard with top ExternalLab in rights reserved.
      </div> */}
    </div>
  );
};

export default UserListPage;