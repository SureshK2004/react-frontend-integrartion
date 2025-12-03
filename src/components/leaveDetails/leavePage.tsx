import React, { useState, useEffect } from "react";
import LeaveHead from "./leaveHead";
import CommonFilters, { FilterConfig } from "../filtersDetails/filters";
import UserTable from "../userDetails/user";
import ExportComponent from "../exportOption/exportTo";
import { User, defaultUsers } from "../userDetails/user";
import { Card, CardContent } from "@/components/ui/card";
import BigCalendar from "./BigCalendar";

const LeavePage: React.FC = () => {
  const [leaveUsers, setLeaveUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaveUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulated API call
      setTimeout(() => {
        setLeaveUsers(defaultUsers);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to fetch leave data");
      console.error("Error fetching leave users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveUsers();
  }, []);

  // Export data
  const prepareExportData = () =>
    leaveUsers.map((user) => ({
      Name: user.name,
      "Employee ID": user.employeeId,
      Date: user.date,
      Department: user.department,
      PU: user.pu,
      Status: user.status,
    }));

  const handleFilterChange = (filters: any) => {
    console.log("Leave filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("Leave search query:", query);
  };

  const handleRefresh = () => {
    console.log("Refreshing leave data...");
    fetchLeaveUsers();
  };

  // Filter Config
  const filterConfig: FilterConfig = {
    showUserType: true,
    showDepartment: false,
    showToDate: false,
    showFromDate: false,
    showFilterForm: false,
    showColumnSelector: false,
    labels: {
      userType: "User Name",
      department: "Department",
      from: "From Date",
      to: "To Date",
      filter: "Filter Leaves",
      searchPlaceholder: "Search leaves...",
    },
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,
    initialFilters: {
      department: "",
      status: "",
      fromDate: undefined,
      toDate: undefined,
    },
  };

  // Mock Summary Data
  const summaryData = [
    {
      title: "Total Days (Punch In/Out)",
      value: 45,
      className: "bg-primary text-white",
    },
    {
      title: "Approved",
      value: "38/45",
      progress: 84,
      className:
        "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      progressColor: "bg-green-500",
    },
    {
      title: "Pending",
      value: "5/45",
      progress: 12,
      className:
        "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
      progressColor: "bg-yellow-500",
    },
    {
      title: "Rejected",
      value: "2/45",
      progress: 4,
      className:
        "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      progressColor: "bg-red-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <LeaveHead />

      <CommonFilters config={filterConfig} showTopFilters={true} />
      {/* Main Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-6">
        {/* Filters + Export */}
        <div className="">

          {/* Summary Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryData.map((item, index) => (
              <Card
                key={index}
                className={`transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:shadow-md ${item.className}`}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3
                      className={`text-sm font-medium ${index === 0 ? "text-white" : "text-gray-600 dark:text-gray-300"
                        }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-2xl font-bold mt-2 ${index === 0 ? "text-white" : "text-gray-900 dark:text-white"
                        }`}
                    >
                      {item.value}
                    </p>

                    {item.progress && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${item.progressColor}`}
                            style={{ width: `${item.progress}%`, transition: "width 1s ease-in-out" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <BigCalendar />
      </div>
    </div>
  );
};

export default LeavePage;
