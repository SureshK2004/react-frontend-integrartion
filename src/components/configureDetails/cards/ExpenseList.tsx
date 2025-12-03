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

const ExpenseList: React.FC = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = (data: any) => {
    console.log("New Expense Added", data);
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Dummy Data
  const expenseData = [
    {
      id: 1,
      expenseType: "Travel",
      measureUnit: "Km",
      price: "15",
      currency: "INR",
    },
    {
      id: 2,
      expenseType: "Meal",
      measureUnit: "Per Day",
      price: "300",
      currency: "INR",
    },
    {
      id: 3,
      expenseType: "Accommodation",
      measureUnit: "Per Night",
      price: "1200",
      currency: "INR",
    },
    {
      id: 4,
      expenseType: "Software License",
      measureUnit: "Per Month",
      price: "500",
      currency: "USD",
    },
    {
      id: 5,
      expenseType: "Fuel",
      measureUnit: "Litre",
      price: "105",
      currency: "INR",
    },
    {
      id: 6,
      expenseType: "Stationery",
      measureUnit: "Pack",
      price: "150",
      currency: "INR",
    },
  ];

  const totalPages = Math.ceil(expenseData.length / itemsPerPage);

  const columns = [
    { key: "id", label: "S.No" },
    { key: "expenseType", label: "Expense Type" },
    { key: "measureUnit", label: "Measure Unit" },
    { key: "price", label: "Price" },
    { key: "currency", label: "Currency" },
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
                Expense List
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
                Add Expense
              </button>

              <AddModal
                title="Add Expense"
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAdd}
                fields={[
                  {
                    label: "Expense Type",
                    key: "expenseType",
                    placeholder: "Enter expense type",
                  },
                  {
                    label: "Measure Unit",
                    key: "measureUnit",
                    placeholder: "e.g., Km, Litre, Day",
                  },
                  {
                    label: "Price",
                    key: "price",
                    type: "number",
                    placeholder: "Enter price",
                  },
                  {
                    label: "Currency",
                    key: "currency",
                    type: "select",
                    options: ["INR", "USD", "EUR", "GBP"],
                  },
                ]}
              />
            </div>
          </div>

          {/* ✅ Table */}
          <TableComponent
            tableId="expense-table-details"
            columns={columns}
            data={expenseData.map((d) => ({
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

export default ExpenseList;
