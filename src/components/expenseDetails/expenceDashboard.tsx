// components/expenseDashboard.tsx
import React, { useState, useEffect } from "react";
import CommonFilters, { FilterConfig } from "../filtersDetails/filters";
import ExportComponent from "../exportOption/exportTo";
import UserTable, { defaultUsers, User } from "../userDetails/user";

const ExpenseDashboard: React.FC = () => {
  const [expenseUsers, setExpenseUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle filter changes for expenses
  const handleFilterChange = (filters: any) => {
    console.log("Expense filters changed:", filters);
    // Implement your expense filter logic here
  };

  // Handle search for expenses
  const handleSearch = (query: string) => {
    console.log("Expense search query:", query);
    // Implement expense search logic here
  };

  // Handle refresh for expenses
  const handleRefresh = () => {
    console.log("Refreshing expense data...");
    fetchExpenseUsers();
  };

  // Fetch expense users data
  const fetchExpenseUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call - use default users for now
      setTimeout(() => {
        setExpenseUsers(defaultUsers);
      }, 500);
    } catch (err) {
      setError('Failed to fetch expense data');
      console.error('Error fetching expense users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseUsers();
  }, []);

  // Prepare export data
  const prepareExportData = () => {
    return expenseUsers.map(user => ({
      Name: user.name,
      'Employee ID': user.employeeId,
      Date: user.date,
      Department: user.department,
      PU: user.pu,
      Status: user.status
    }));
  };

  // Filter configuration customized for expenses
  const filterConfig: FilterConfig = {
    showUserType: true,        // User Name filter
    showDepartment: true,      // Department filter
    showToDate: true,          // To filter (date)
    showFromDate: true,        // From filter (date) - added for expenses
    showFilterForm: true,      // Enable filter form modal
    showColumnSelector: true,  // Enable column selector in modal
    
    // Custom labels for expenses
    labels: {
      userType: "User Name",
      department: "Department",
      from: "From Date",
      to: "To Date",
      filter: "Filter Expenses",
      searchPlaceholder: "Search expenses..."
    },
    
    // Event handlers
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,
    
    // Initial filter values for expenses
    initialFilters: {
      department: "",
      status: "",
      fromDate: undefined,
      toDate: undefined
    }
  };

  return (
    <div className="space-y-6">
      {/* Add CommonFilters component for expenses */}
      <CommonFilters 
        config={filterConfig}
        showTopFilters={true}
      />
      
      {/* Dashboard Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Expense Dashboard
            </h3>
          </div>
          
          {/* Export Section */}
          <div className="flex items-center justify-center sm:justify-start">
            <ExportComponent
              tableId="expense-user-table"
              filename="expense_dashboard"
              data={prepareExportData()}
            />
          </div>
        </div>

        {/* Expense Users Table */}
        <div className="mt-6">
          <UserTable
            users={expenseUsers}
            loading={loading}
            error={error}
            onRetry={fetchExpenseUsers}
            mode="attendance"
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseDashboard;