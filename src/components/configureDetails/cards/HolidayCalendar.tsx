import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import {
  ArrowBigDownDash,
  ArrowLeft,
  Download,
  Edit,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import AddModal from "./AddModal";
import UploadModal from "./UploadModal";

const HolidayCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const handleAdd = (data: any) => {
    console.log("New Holiday Added", data);
  };
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleFileUpload = (file: File) => {
    console.log("Uploaded File:", file);
    // later you can parse it or send to backend
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Dummy Data
  const holidayData = [
    { id: 1, leaveName: "New Year", fromDate: "2025-01-01", toDate: "2025-01-01" },
    { id: 2, leaveName: "Republic Day", fromDate: "2025-01-26", toDate: "2025-01-26" },
    { id: 3, leaveName: "Holi", fromDate: "2025-03-18", toDate: "2025-03-18" },
    { id: 4, leaveName: "Good Friday", fromDate: "2025-04-18", toDate: "2025-04-18" },
    { id: 5, leaveName: "Labor Day", fromDate: "2025-05-01", toDate: "2025-05-01" },
    { id: 6, leaveName: "Independence Day", fromDate: "2025-08-15", toDate: "2025-08-15" },
    { id: 7, leaveName: "Diwali", fromDate: "2025-10-20", toDate: "2025-10-21" },
    { id: 8, leaveName: "Christmas", fromDate: "2025-12-25", toDate: "2025-12-25" },
  ];

  const totalPages = Math.ceil(holidayData.length / itemsPerPage);

  const columns = [
    { key: "id", label: "S.No" },
    { key: "leaveName", label: "Leave Name" },
    { key: "fromDate", label: "From Date" },
    { key: "toDate", label: "To Date" },
    { key: "actions", label: "Actions" },
  ];

  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-gray-200 dark:bg-gray-800 flex items-center gap-1 text-green-600 border-green-600"
        onClick={() => console.log("Edit", row.id)}
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-gray-200 dark:bg-gray-800 flex items-center gap-1 text-red-600 border-red-600"
        onClick={() => console.log("Delete", row.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Holiday Calendar
              </h2>
            </div>

            {/* Back Button + Theme */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ArrowLeft size={18} />
                Back
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tables
              </h2>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Download size={18} />
                Download Template
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Upload size={18} />
                Upload Excel
              </button>
              <UploadModal
                title="Upload Holiday Excel"
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onSubmit={handleFileUpload}
              />

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ArrowBigDownDash size={18} />
                Add Event
              </button>

              <AddModal
                title="Add Holiday"
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAdd}
                fields={[
                  { label: "Leave Name", key: "leaveName" },
                  { label: "From Date", key: "fromDate", type: "date" },
                  { label: "To Date", key: "toDate", type: "date" },
                ]}
              />
            </div>
          </div>

          <TableComponent
            tableId="holiday-table-details"
            columns={columns}
            data={holidayData.map((d) => ({
              ...d,
              actions: renderActions(d),
            }))}
            currentPage={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default HolidayCalendar;
