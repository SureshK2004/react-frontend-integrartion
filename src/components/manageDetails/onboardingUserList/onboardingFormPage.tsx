// components/manageDetail/subPages/OnboardingFormPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CommonFilters, { FilterConfig } from '@/components/filtersDetails/filters';
import UserTable from '@/components/userDetails/user';
import ExportComponent from '@/components/exportOption/exportTo';
import { User } from '@/components/userDetails/user';
import { defaultUsers } from '@/components/userDetails/user';
import OnboardingFormHead from './onboardingFormHead';
import EditUserPopup from '../editUsersDetails/editUserPopup';

// Add view and edit icons
const ViewIcon = () => (
  <svg className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4 text-gray-600 hover:text-green-600 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const AddUserIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const OnboardingFormPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  const handleAddUser = () => {
    navigate('/onboarding-form-standalone');
  };

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

  // Handle view action
  const handleView = (user: User) => {
    console.log('View user:', user);
    // Add your view logic here - you can create a view popup similar to edit
    alert(`Viewing user: ${user.name}\nEmployee ID: ${user.employeeId}\nDepartment: ${user.department}\nStatus: ${user.status}`);
  };

  // Handle edit action
  const handleEdit = (user: User) => {
    console.log('Edit user:', user);
    setSelectedUser(user);
    setIsEditPopupOpen(true);
  };

  // Handle save edited user
  const handleSaveUser = (updatedUser: User) => {
    console.log('Saving user:', updatedUser);
    
    // Update the user in the state
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    
    // Close the popup
    setIsEditPopupOpen(false);
    setSelectedUser(null);
    
    // Show success message (you can replace this with a toast notification)
    alert('User updated successfully!');
  };

  // Handle close popup
  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
    setSelectedUser(null);
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
    console.log("Onboarding filters changed:", filters);
    // Implement your filter logic here
  };

  // Handle search
  const handleSearch = (query: string) => {
    console.log("Onboarding search query:", query);
    // Implement search logic here
  };

  // Handle refresh
  const handleRefresh = () => {
    console.log("Refreshing onboarding data...");
    fetchUsers();
  };

  // Filter configuration for onboarding management
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
    
    // Custom labels for onboarding management
    labels: {
      userType: "User Name",
      department: "Department",
      zone: "Zone",
      branch: "Branch",
      from: "From Date",
      to: "To Date",
      status: "Status",
      totalHours: "Total Hours",
      designation: "Designation",
      filter: "Filter ",
      searchPlaceholder: "Search onboarding..."
    },
    
    // Options for dropdowns
    options: {
      userType: ["Akash", "Manoj", "Gokul", "John", "Doe", "Alice", "Bob"],
      department: ["Design", "Development", "Marketing", "HR", "Finance", "Operations"],
      zone: ["North", "South", "East", "West", "Central"],
      branch: ["Main Branch", "Downtown", "Uptown", "Suburban", "Rural"],
      status: ["Pending", "In Progress", "Completed", "On Hold"],
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
      {/* Header without Tabs */}
      <OnboardingFormHead />

      {/* Main Content */}
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
              Onboarding Table
            </h3>
          </div>
          
          {/* Action Buttons Section */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Add User Button */}
            <button
              onClick={handleAddUser}
              className="flex items-center justify-center px-4 py-2 bg-primary hover:bg-blue-900 text-white font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
            >
              <AddUserIcon />
              Add User
            </button>
            
            {/* Export Button */}
            <ExportComponent
              tableId="onboarding-management-table"
              filename="onboarding_management"
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
            mode="onboarding"
            // Add action column configuration
            renderActionColumn={(user, index) => (
              <div className="flex items-center space-x-3">
                <div onClick={() => handleView(user)} title="View" className="cursor-pointer">
                  <ViewIcon />
                </div>
                <div onClick={() => handleEdit(user)} title="Edit" className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
            )}
            actionColumnHeader="Action"
          />
        </div>
      </div>

      {/* Edit User Popup - This will appear as modal overlay */}
      {isEditPopupOpen && (
        <EditUserPopup
          user={selectedUser}
          isOpen={isEditPopupOpen}
          onClose={handleClosePopup}
          onSave={handleSaveUser}
        />
      )}

      {/* Footer */}
      {/* <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Copyright © 2021 Zazzali, thirdguard with top ExternalLab in rights reserved.
      </div> */}
    </div>
  );
};

export default OnboardingFormPage;