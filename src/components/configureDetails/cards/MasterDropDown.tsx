import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import {
  ArrowBigDownDash,
  ArrowLeft,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import AddModal from "./AddModal";

const MasterDropdownList: React.FC = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = (data: any) => {
    console.log("New Master Dropdown Added", data);
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Dummy Data
  const masterDropdownData = [
    {
      id: 1,
      type: "Department",
      code: "DEP001",
      values: "HR, IT, Sales",
      reference: "Employee Management",
    },
    {
      id: 2,
      type: "Designation",
      code: "DES001",
      values: "Manager, Developer, Intern",
      reference: "Organization Roles",
    },
    {
      id: 3,
      type: "Location",
      code: "LOC001",
      values: "Chennai, Bangalore, Mumbai",
      reference: "Office Locations",
    },
    {
      id: 4,
      type: "ExpenseType",
      code: "EXP001",
      values: "Travel, Meal, Accommodation",
      reference: "Expense Master",
    },
    {
      id: 5,
      type: "LeaveType",
      code: "LEV001",
      values: "Sick, Casual, Earned",
      reference: "Leave Management",
    },
  ];

  const totalPages = Math.ceil(masterDropdownData.length / itemsPerPage);

  const columns = [
    { key: "id", label: "S.No" },
    { key: "type", label: "Type" },
    { key: "code", label: "Code" },
    { key: "values", label: "Values" },
    { key: "reference", label: "Reference" },
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
        {/* ✅ Header */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Master Dropdown List
              </h2>
            </div>
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

        {/* ✅ Table Section */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tables
              </h2>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ArrowBigDownDash size={18} />
                Add Master Dropdown
              </button>

              <AddModal
                title="Add Master Dropdown"
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAdd}
                fields={[
                  {
                    label: "Type",
                    key: "type",
                    placeholder: "Enter type (e.g., Department, Location)",
                  },
                  {
                    label: "Code",
                    key: "code",
                    placeholder: "Enter unique code",
                  },
                  {
                    label: "Values",
                    key: "values",
                    placeholder: "Enter comma-separated values",
                  },
                  {
                    label: "Reference",
                    key: "reference",
                    placeholder: "Enter reference info",
                  },
                ]}
              />
            </div>
          </div>

          {/* ✅ Table */}
          <TableComponent
            tableId="master-dropdown-table-details"
            columns={columns}
            data={masterDropdownData.map((d) => ({
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

export default MasterDropdownList;
