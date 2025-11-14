import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import AddModal from "./AddModal";

const SLAConfiguration: React.FC = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  const [slaData, setSlaData] = useState([
    { id: 1, priority: "High", resolutionTime: "4 Hours" },
    { id: 2, priority: "Medium", resolutionTime: "1 Day" },
    { id: 3, priority: "Low", resolutionTime: "3 Days" },
  ]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(slaData.length / itemsPerPage);

  const handleAdd = (data: any) => {
    const newEntry = {
      id: slaData.length + 1,
      priority: data.priority,
      resolutionTime: `${data.resolutionTime} ${data.resolutionUnit}`,
    };
    setSlaData([...slaData, newEntry]);
    console.log("✅ New SLA Added:", newEntry);
  };

  const columns = [
    { key: "id", label: "S.No" },
    { key: "priority", label: "Priority" },
    { key: "resolutionTime", label: "Resolution Time" },
    { key: "actions", label: "Actions" },
  ];

  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600"
        onClick={() => console.log("Edit", row.id)}
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-gray-200 dark:bg-gray-800 text-red-600 border-red-600"
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
        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              SLA Configuration
            </h2>
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
        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              SLA List
            </h2>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <Plus size={18} />
              Add SLA
            </button>

            {/* ✅ Add Modal */}
            <AddModal
              title="Add SLA Configuration"
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAdd}
              fields={[
                {
                  label: "Priority",
                  key: "priority",
                  type: "select",
                  options: ["High", "Medium", "Low"],
                },
                {
                  label: "Resolution Time",
                  key: "resolutionTime",
                  type: "number",
                  placeholder: "Enter time (e.g., 4)",
                },
                {
                  label: "Resolution Unit",
                  key: "resolutionUnit",
                  type: "select",
                  options: ["Hours", "Days"],
                },
              ]}
            />
          </div>

          {/* ✅ Table */}
          <TableComponent
            tableId="sla-config-table"
            columns={columns}
            data={slaData.map((item) => ({
              ...item,
              actions: renderActions(item),
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

export default SLAConfiguration;
