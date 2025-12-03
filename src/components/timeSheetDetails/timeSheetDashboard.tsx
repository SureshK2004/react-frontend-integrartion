import React, { useState, useEffect } from "react";
import CommonFilters, { FilterConfig } from "../filtersDetails/filters";
import ExportComponent from "../exportOption/exportTo";
import UserTable, { defaultUsers, User } from "../userDetails/user";
import TimeSheetTable, { defaultTimeSheets, TimeSheetEntry } from "../timeSheetDetails/TimeSheetTable";

import { Button } from "../ui/button";

const TimeSheetDashboard: React.FC = () => {
  const [timeSheetUsers, setTimeSheetUsers] = useState<User[]>([]);
  const [timeSheets, setTimeSheets] = useState<TimeSheetEntry[]>(defaultTimeSheets);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newSheet, setNewSheet] = useState({
    project: "",
    task: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  })
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // for eye view 
  const [selectedSheet, setSelectedSheet] = useState<TimeSheetEntry | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleViewDetails = (sheet: TimeSheetEntry) => {
    setSelectedSheet(sheet);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedSheet(null);
  };


  const handleSubmit = () => {
    console.log('new TimeSheet ', newSheet);
    handleCloseModal();
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSheet((prev) => ({ ...prev, [name]: value }));
  };
  // Handle filter changes for time sheets
  const handleFilterChange = (filters: any) => {
    console.log("Time Sheet filters changed:", filters);
    // Implement your time sheet filter logic here
  };

  // Handle search for time sheets
  const handleSearch = (query: string) => {
    console.log("Time Sheet search query:", query);
    // Implement time sheet search logic here
  };

  // Handle refresh for time sheets
  const handleRefresh = () => {
    console.log("Refreshing time sheet data...");
    fetchTimeSheetUsers();
  };

  // Fetch time sheet users data
  const fetchTimeSheetUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      setTimeout(() => {
        setTimeSheets(defaultTimeSheets);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to fetch time sheet data");
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchTimeSheetUsers();
  }, []);

  // Prepare export data
  const prepareExportData = () => {
    return timeSheetUsers.map(user => ({
      Name: user.name,
      'Employee ID': user.employeeId,
      Date: user.date,
      Department: user.department,
      PU: user.pu,
      Status: user.status
    }));
  };

  // Filter configuration customized for time sheets
  const filterConfig: FilterConfig = {
    showUserType: true,        // User Name filter
    showDepartment: true,      // Department filter
    showToDate: true,          // To filter (date)
    showFromDate: true,        // From filter (date)
    showFilterForm: true,      // Enable filter form modal
    showColumnSelector: true,  // Enable column selector in modal

    // Custom labels for time sheets
    labels: {
      userType: "User Name",
      department: "Department",
      from: "From Date",
      to: "To Date",
      filter: "Filter Time Sheets",
      searchPlaceholder: "Search time sheets..."
    },

    // Event handlers
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,

    // Initial filter values for time sheets
    initialFilters: {
      department: "",
      status: "",
      fromDate: undefined,
      toDate: undefined
    }
  };

  return (
    <div className="space-y-6">
      {/* Add CommonFilters component for time sheets */}
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
              Time Sheet Dashboard
            </h3>
          </div>
          {/* Export Section */}
          <div className="flex items-center justify-center sm:justify-start gap-5">
            <Button onClick={handleOpen}>Add TimeSheet</Button>
            {/* <ExportComponent
              tableId="timesheet-user-table"
              filename="timesheet_dashboard"
              data={prepareExportData()}
            /> */}
          </div>
        </div>

        {/* Time Sheet Users Table */}
        <div className="mt-6">
          <TimeSheetTable
            timeSheets={timeSheets}
            loading={loading}
            error={error}
            onRetry={fetchTimeSheetUsers}
            onViewDetails={handleViewDetails}
          />

        </div>
      </div>
      {/* ----------------Form Modal ---------------- */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Time Sheet
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Project *</label>
                <select
                  name="project"
                  value={newSheet.project}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 mt-1 bg-transparent"
                >
                  <option value="">Select Project</option>
                  <option value="Project A">Project A</option>
                  <option value="Project B">Project B</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Task *</label>
                <select
                  name="task"
                  value={newSheet.task}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 mt-1 bg-transparent"
                >
                  <option value="">Select Task</option>
                  <option value="Development">Development</option>
                  <option value="Testing">Testing</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={newSheet.date}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2 mt-1 bg-transparent"
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Start Time *</label>
                  <input
                    type="time"
                    name="startTime"
                    value={newSheet.startTime}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2 mt-1 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">End Time *</label>
                  <input
                    type="time"
                    name="endTime"
                    value={newSheet.endTime}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2 mt-1 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={newSheet.description}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 mt-1 bg-transparent"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={handleCloseModal}
                className="border-gray-400"
              >
                Close
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      )}

      {/* view modal */}
      {showDetailsModal && selectedSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-gray-900/95 dark:to-gray-800/95
      rounded-3xl shadow-2xl border border-gray-200/30 dark:border-gray-700/40 w-full max-w-2xl p-8 animate-fadeIn">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">🕒 Time Sheet Details</h2>
              <button
                onClick={handleCloseDetails}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl transition"
              >
                ✕
              </button>
            </div>

            {/* Form-like layout */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1">Employee ID</label>
                <input
                  readOnly
                  value={selectedSheet.employeeId}
                  className="h-12 text-base w-full bg-gray-50 dark:bg-gray-800
              border border-secondary-200 dark:border-secondary-700 
              focus:border-primary-500 focus:ring-primary-500/20 
              rounded-xl px-4 text-gray-800 dark:text-gray-100 transition"
                />
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1">Name</label>
                <input
                  readOnly
                  value={selectedSheet.name}
                  className="h-12 text-base w-full bg-gray-50 dark:bg-gray-800 
              border border-secondary-200 dark:border-secondary-700 
              focus:border-primary-500 focus:ring-primary-500/20 
              rounded-xl px-4 text-gray-800 dark:text-gray-100 transition"
                />
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1">Project</label>
                <input
                  readOnly
                  value={selectedSheet.project}
                  className="h-12 text-base w-full bg-gray-50 dark:bg-gray-800 border-secondary-200 dark:border-secondary-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl px-4 text-gray-800 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1">Date</label>
                <input
                  readOnly
                  value={selectedSheet.date}
                  className="h-12 text-base w-full bg-gray-50 dark:bg-gray-800 border-secondary-200 dark:border-secondary-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl px-4 text-gray-800 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1">Start Time</label>
                <input
                  readOnly
                  value={selectedSheet.startTime}
                  className="h-12 text-base w-full bg-gray-50 dark:bg-gray-800 border-secondary-200 dark:border-secondary-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl px-4 text-gray-800 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1">End Time</label>
                <input
                  readOnly
                  value={selectedSheet.endTime}
                  className="h-12 text-base w-full bg-gray-50 dark:bg-gray-800 border-secondary-200 dark:border-secondary-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl px-4 text-gray-800 dark:text-gray-100"
                />
              </div>

              <div className="col-span-2">
                <label className="text-gray-500 dark:text-gray-400 block mb-1">Description</label>
                <textarea
                  readOnly
                  rows={3}
                  value={selectedSheet.description}
                  className="w-full text-base bg-gray-50 dark:bg-gray-800 border-secondary-200 dark:border-secondary-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleCloseDetails}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium shadow hover:bg-primary/90 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}




    </div>
  );
};

export default TimeSheetDashboard;
