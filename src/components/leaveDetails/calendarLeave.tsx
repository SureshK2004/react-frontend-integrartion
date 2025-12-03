import React from "react";
import LeaveHead from "./leaveHead";
import { Card, CardContent } from "../ui/card";
import CommonFilters, { FilterConfig } from "../filtersDetails/filters";
import BigCalendar from "./BigCalendar";
const CalendarPage: React.FC = () => {
  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    console.log("Holiday filters changed:", filters);
    // Implement your holiday filter logic here
  };

  // Handle search
  const handleSearch = (query: string) => {
    console.log("Holiday search query:", query);
    // Implement holiday search logic here
  };

  // Handle refresh
  const handleRefresh = () => {
    console.log("Refreshing holiday data...");
    // Implement holiday refresh logic here
  };

  // Filter configuration specific for holidays
  const filterConfig: FilterConfig = {
    showUserType: false,       // Hide User Name filter for holidays
    showDepartment: false,     // Hide Department filter for holidays
    showFromDate: true,        // Show From date filter
    showToDate: true,          // Show To date filter
    showStatus: true,          // Show Status filter
    showTotalHours: false,     // Hide Total Hours filter for holidays
    showFilterForm: true,      // Enable filter form modal
    showColumnSelector: true,  // Enable column selector in modal

    // Custom labels for holidays


    // Options for dropdowns specific to holidays
    options: {
      status: ["National Holiday", "Regional Holiday", "Company Holiday", "Public Holiday", "Optional Holiday"],
      // Remove userType and department options since they're hidden
    },

    // Event handlers
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,

    // Initial filter values for holidays
    initialFilters: {
      fromDate: undefined,
      toDate: undefined,
      status: ""
    }
  };
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

      {/* Add CommonFilters component with holiday-specific configuration */}
      <CommonFilters
        config={filterConfig}
        showTopFilters={true}
      />

      {/* Holiday content */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Full Calendar
        </h2>

        {/* Holiday list/calendar component will go here */}
        {/* Main Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-6">
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
    </div>
  );
};

export default CalendarPage;