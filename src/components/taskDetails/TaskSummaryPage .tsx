import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ExportComponent from "../exportOption/exportTo";
import CommonFilters, { FilterConfig } from "../filtersDetails/filters";
import TableComponent from "../common/TableComponent";

// Move interfaces and static data outside component
export interface TaskSummary {
  sno: number;
  taskName: string;
  details: string;
  employeeId?: string;
  assignTo?: string;
  assignedBy?: string;
  date: string;
  startTime: string;
  endTime?: string;
  team?: string;
  from: string;
  client: string;
  site: string;
  status: "UserTask" | "Approved" | "Pending" | "Rejected";
}

export const defaultTaskSummaryData: TaskSummary[] = [
  {
    sno: 1,
    taskName: "Site Audit",
    details: "Audit electrical equipment",
    employeeId: "EMP001",
    assignTo: "John",
    assignedBy: "Manager A",
    date: "2025-10-27",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    team: "Alpha",
    from: "HQ",
    client: "Reliance",
    site: "Mumbai",
    status: "UserTask",
  },
  {
    sno: 2,
    taskName: "Maintenance Check",
    details: "HVAC inspection",
    assignedBy: "Manager B",
    date: "2025-10-28",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    team: "Beta",
    from: "Regional Office",
    client: "Tata Power",
    site: "Chennai",
    status: "Approved",
  },
  {
    sno: 3,
    taskName: "Safety Training",
    details: "Worker safety briefing",
    assignedBy: "Manager C",
    date: "2025-10-29",
    startTime: "01:00 PM",
    endTime: "03:00 PM",
    team: "Gamma",
    from: "Main Branch",
    client: "Adani Infra",
    site: "Delhi",
    status: "Pending",
  },
  {
    sno: 4,
    taskName: "Client Visit",
    details: "Meet client for feedback",
    assignedBy: "Manager D",
    date: "2025-10-30",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    team: "Delta",
    from: "HQ",
    client: "JSW Steel",
    site: "Hyderabad",
    status: "Rejected",
  },
  {
    sno: 5,
    taskName: "Equipment Inspection",
    details: "Check machinery functionality",
    employeeId: "EMP002",
    assignTo: "Sarah",
    assignedBy: "Manager E",
    date: "2025-10-31",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    team: "Alpha",
    from: "HQ",
    client: "Reliance",
    site: "Mumbai",
    status: "UserTask",
  },
  {
    sno: 6,
    taskName: "Software Update",
    details: "Update system software",
    employeeId: "EMP003",
    assignTo: "Mike",
    assignedBy: "Manager F",
    date: "2025-11-01",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    team: "Beta",
    from: "IT Department",
    client: "Internal",
    site: "Bangalore",
    status: "UserTask",
  },
];

// Modal Component
const TaskDetailsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  task: TaskSummary | null;
}> = ({ isOpen, onClose, task }) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 mx-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Task Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <Button className="bg-gray-700 text-white hover:bg-gray-800" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

// Table Actions Component
const TableActions: React.FC<{
  selectedTasks: Set<number>;
  onApprove: () => void;
  onReject: () => void;
}> = ({ selectedTasks, onApprove, onReject }) => (
  <div className="flex justify-end items-center gap-4 mt-4">
    <Button
      className={`bg-green-600 text-white font-semibold px-6 py-2 rounded-xl transition-all ${
        selectedTasks.size === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
      }`}
      disabled={selectedTasks.size === 0}
      onClick={onApprove}
    >
      Approve
    </Button>
    <Button
      className={`bg-red-600 text-white font-semibold px-6 py-2 rounded-xl transition-all ${
        selectedTasks.size === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
      }`}
      disabled={selectedTasks.size === 0}
      onClick={onReject}
    >
      Reject
    </Button>
  </div>
);

interface TaskSummaryTableProps {
  tasks?: TaskSummary[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  activeTab?: string;
  onTaskView?: (task: TaskSummary) => void;
  selectedRows?: Set<number>;
  onRowSelect?: (index: number) => void;
  onSelectAll?: () => void;
  selectAll?: boolean;
  currentPage?: number;
  itemsPerPage?: number;
}


const TaskSummaryTable: React.FC<TaskSummaryTableProps> = ({
  tasks = [],
  loading = false,
  error = null,
  onRetry,
  activeTab = "usertask",
  onTaskView,
  selectedRows = new Set<number>(),
  onRowSelect,
  onSelectAll,
  selectAll = false,
  currentPage = 1,
  itemsPerPage = 5,
}) => {
  const displayTasks = tasks.length > 0 ? tasks : defaultTaskSummaryData;

  
  const columnsMap = useMemo(() => ({
    usertask: [
      { 
        key: "taskName", 
        label: "Task Name" 
      },
      { 
        key: "details", 
        label: "Details", 
        render: (row: TaskSummary) => (
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700 py-1 rounded-md"
            onClick={() => onTaskView?.(row)}
          >
            View
          </Button>
        )
      },
      { 
        key: "employeeId", 
        label: "Employee ID" 
      },
      { 
        key: "assignTo", 
        label: "Assign To"
      },
      { 
        key: "date", 
        label: "Date"
      },
      { 
        key: "startTime", 
        label: "Start Time"
      },
      { 
        key: "endTime", 
        label: "End Time"
      },
      { 
        key: "team", 
        label: "Team" 
      },
      { 
        key: "from", 
        label: "From" 
      },
      { 
        key: "client", 
        label: "Client"
      },
      { 
        key: "site", 
        label: "Site" 
      },
    ],
    // ... other tab columns (same as before)
  }), [onTaskView]);

  // Filter data based on active tab
  const filteredData = useMemo(() => 
    displayTasks.filter((task) => task.status.toLowerCase() === activeTab),
    [displayTasks, activeTab]
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const columns = columnsMap[activeTab as keyof typeof columnsMap] || columnsMap.usertask;

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading tasks...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8 text-center">
        <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  
  return (
    <TableComponent
      tableId="task-summary-table"
      columns={columns}
      data={filteredData} // ← Full data, not paginated
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      onPageChange={() => {}} // This will be handled by parent
      selectable={activeTab === "usertask"}
      selectAll={selectAll}
      selectedRows={selectedRows}
      onSelectAll={onSelectAll}
      onRowSelect={onRowSelect}
    />
  );
};

// Main component
const TaskSummaryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("usertask");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskSummary | null>(null);

  const handleView = (task: TaskSummary) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleSelectAll = () => {
    const filteredData = defaultTaskSummaryData.filter(task => task.status.toLowerCase() === activeTab);
    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      const allRows = new Set(
        currentData.map((_, idx) => (currentPage - 1) * itemsPerPage + idx)
      );
      setSelectedRows(allRows);
    }
    setSelectAll(!selectAll);
  };


  const handleRowSelect = (index: number) => {
    const updated = new Set(selectedRows);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    setSelectedRows(updated);
  };

  const handleApprove = () => {
    const selectedTaskIds = Array.from(selectedRows).map(index => {
      const filteredData = defaultTaskSummaryData.filter(task => task.status.toLowerCase() === activeTab);
      return filteredData[index]?.sno;
    }).filter(Boolean);
    
    console.log("Approved tasks:", selectedTaskIds);
    // Reset selection after action
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const handleReject = () => {
    const selectedTaskIds = Array.from(selectedRows).map(index => {
      const filteredData = defaultTaskSummaryData.filter(task => task.status.toLowerCase() === activeTab);
      return filteredData[index]?.sno;
    }).filter(Boolean);
    
    console.log("Rejected tasks:", selectedTaskIds);
    // Reset selection after action
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const handleFilterChange = (filters: any) => {
    console.log("Task filters changed:", filters);
  };

  const handleSearch = (query: string) => {
    console.log("Task search query:", query);
  };

  const handleRefresh = () => {
    console.log("Task refresh clicked");
  };

  // Reset selection when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  // Dynamic filters based on activeTab
  const filterConfig: FilterConfig = {
    showUserType: activeTab === "usertask",
    showDepartment: activeTab === "usertask",
    showZone: activeTab === "usertask",
    showBranch: activeTab === "usertask",
    showFromDate: true,
    showToDate: true,
    showFilterForm: true,
    showColumnSelector: activeTab === "usertask",
    showStatus: activeTab === "usertask",
    showTotalHours: activeTab === "usertask",
    showDesignation: activeTab === "usertask",
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,
    labels: {},
  };

  return (
    <div className="space-y-6">
      {/* Tabs Header */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full grid grid-cols-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          {["usertask", "approved", "pending", "rejected"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
            >
              {tab === "usertask"
                ? "User Task"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <CommonFilters key={activeTab} config={filterConfig} showTopFilters={true} />

      {/* Table Section */}
      <div className="bg-gray-50 dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-2 flex items-center justify-between">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Summary Table</h3>
          </div>
          {activeTab === "usertask" && (
            <TableActions
              selectedTasks={selectedRows}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}
        </div>

        <div className="p-6 space-y-4">
          <TaskSummaryTable
            activeTab={activeTab}
            onTaskView={handleView}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
            selectAll={selectAll}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>

      {/* Task Details Modal */}
      <TaskDetailsModal
        isOpen={showModal}
        onClose={closeModal}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskSummaryPage;