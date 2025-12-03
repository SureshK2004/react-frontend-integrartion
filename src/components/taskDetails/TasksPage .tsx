import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import TableComponent from "../common/TableComponent";

export interface Task {
  sno: number;
  taskType: string;
  taskName: string;
  assignedBy: string;
  date: string;
  startTime: string;
  endTime: string;
  avatar: string;
  avatarColor: string;
}

interface TasksTableProps {
  tasks?: Task[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  activeTab?: string;
  searchQuery?: string;
}

// Move default data outside component
export const defaultTasks: Task[] = [
  {
    sno: 1,
    taskType: "Inspection",
    taskName: "Site Audit",
    assignedBy: "John Doe",
    avatar: "J",
    avatarColor: "bg-green-500",
    date: "2025-10-27",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
  },
  {
    sno: 2,
    taskType: "Maintenance",
    taskName: "System Check",
    assignedBy: "Amit Kumar",
    avatar: "A",
    avatarColor: "bg-yellow-500",
    date: "2025-10-28",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    sno: 3,
    taskType: "Quality Check",
    taskName: "Product Review",
    assignedBy: "Priya Sharma",
    avatar: "P",
    avatarColor: "bg-orange-500",
    date: "2025-10-29",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
  },
  {
    sno: 4,
    taskType: "Testing",
    taskName: "UI Bug Fix",
    assignedBy: "Suresh",
    avatar: "S",
    avatarColor: "bg-blue-500",
    date: "2025-10-30",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
  },
  {
    sno: 5,
    taskType: "Quality Check",
    taskName: "Product Review",
    assignedBy: "Priya Sharma",
    avatar: "P",
    avatarColor: "bg-orange-500",
    date: "2025-10-29",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
  },
  {
    sno: 6,
    taskType: "Testing",
    taskName: "UI Bug Fix",
    assignedBy: "Suresh",
    avatar: "S",
    avatarColor: "bg-blue-500",
    date: "2025-10-30",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
  },
];

const TasksTable: React.FC<TasksTableProps> = ({
  tasks = [],
  loading = false,
  error = null,
  onRetry,
  activeTab = "today",
  searchQuery = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const displayTasks = tasks.length > 0 ? tasks : defaultTasks;
  const totalPages = Math.ceil(displayTasks.length / itemsPerPage);

  // Define columns
  const columns = useMemo(
    () => [
      { key: "sno", label: "S.No" },
      { key: "taskType", label: "Task Type" },
      { key: "taskName", label: "Task Name" },
      { key: "assignedBy", label: "Assigned By" },
      { key: "date", label: "Date" },
      { key: "startTime", label: "Start Time" },
      { key: "endTime", label: "End Time" },
    ],
    []
  );

  // Filter visible columns based on active tab
  const visibleColumns = useMemo(() => {
    if (activeTab === "today") {
      return columns.filter(col => col.key !== "date");
    }
    return columns;
  }, [columns, activeTab]);


  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return displayTasks;
    
    const query = searchQuery.toLowerCase();
    return displayTasks.filter(
      task =>
        task.taskName.toLowerCase().includes(query) ||
        task.taskType.toLowerCase().includes(query) ||
        task.assignedBy.toLowerCase().includes(query)
    );
  }, [displayTasks, searchQuery]);


  
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

  // Render function for assignedBy column
  const renderAssignedBy = (row: Task) => (
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-full ${row.avatarColor} flex items-center justify-center text-white font-semibold text-sm shadow-md`}
      >
        {row.avatar}
      </div>
      <p className="font-medium text-gray-900 dark:text-white">{row.assignedBy}</p>
    </div>
  );

  // Transform data for TableComponent
  const tableData = filteredTasks.map((task) => ({
    ...task,
    assignedBy: renderAssignedBy(task),
  }));

  return (
    <div className="bg-gray-50 p-4 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <TableComponent
        tableId="tasks-table"
        columns={visibleColumns}
        data={tableData}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const TasksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Tabs Header */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 bg-white dark:bg-gray-800 rounded-xl p-1">
          <TabsTrigger
            value="today"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
          >
            Today Tasks
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
          >
            Pending Tasks
          </TabsTrigger>
          <TabsTrigger
            value="future"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
          >
            Future Tasks
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filter Section */}
      <Card className="shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <CardContent className="p-6">
          {activeTab === "today" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-sm font-semibold text-secondary-900 dark:text-white mb-2 block">
                  Start Time
                </label>
                <Input type="time" className="h-12 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-semibold text-secondary-900 dark:text-white mb-2 block">
                  End Time
                </label>
                <Input type="time" className="h-12 rounded-xl" />
              </div>
              <Button className="h-12 bg-primary text-white font-semibold rounded-xl">
                <Search className="w-4 h-4 mr-2" /> Search
              </Button>
            </div>
          )}

          {(activeTab === "pending" || activeTab === "future") && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-sm font-semibold text-secondary-900 dark:text-white mb-2 block">
                  From Date
                </label>
                <Input type="date" className="h-12 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-semibold text-secondary-900 dark:text-white mb-2 block">
                  To Date
                </label>
                <Input type="date" className="h-12 rounded-xl" />
              </div>
              <Button className="h-12 bg-primary text-white font-semibold rounded-xl">
                <Search className="w-4 h-4 mr-2" /> Search
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="bg-white dark:bg-gray-900 p-6 space-y-4">
          {/* Header: Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2 w-full md:w-1/3">
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={handleSearch}
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          {/* Tasks Table */}
          <TasksTable 
            activeTab={activeTab}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;