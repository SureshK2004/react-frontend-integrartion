import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowLeft, Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import CustomFieldModal from "./CustomFieldFormModal";

interface CustomField {
    id: string;
    fieldName: string;
    customization: "assignee" | "assigner";
    required: boolean;
    fieldType: "text" | "select" | "file" | "number" | "date" | "textarea";
    options?: string[];
}

interface TaskTypeData {
    id: number;
    taskType: string;
    customField: string;
    fields?: CustomField[]; 
}

const TaskType: React.FC = () => {
    const navigate = useNavigate();

    // Modal states
    const [showAddTaskTypeModal, setShowAddTaskTypeModal] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "view" | "edit">("add");
    const [selectedTaskType, setSelectedTaskType] = useState<TaskTypeData | null>(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // Mock data with custom fields
    const [taskTypeData, setTaskTypeData] = useState<TaskTypeData[]>([
        {
            id: 1,
            taskType: "mobile developer",
            customField: "View",
            fields: [
                {
                    id: "1",
                    fieldName: "Developer Name",
                    customization: "assignee",
                    required: true,
                    fieldType: "text"
                }
            ]
        },
        {
            id: 2,
            taskType: "Requirement",
            customField: "View",
            fields: [
                {
                    id: "2",
                    fieldName: "Requirement Type",
                    customization: "assigner",
                    required: false,
                    fieldType: "select",
                    options: ["Functional", "Technical", "UI/UX"]
                }
            ]
        },
        {
            id: 3,
            taskType: "Photo",
            customField: "View",
            fields: [
                {
                    id: "3",
                    fieldName: "Image Upload",
                    customization: "assignee",
                    required: true,
                    fieldType: "file"
                }
            ]
        },
        {
            id: 4,
            taskType: "Marketing",
            customField: "View",
            fields: [
                {
                    id: "4",
                    fieldName: "Campaign Budget",
                    customization: "assigner",
                    required: true,
                    fieldType: "number"
                }
            ]
        },
        {
            id: 5,
            taskType: "test all fields",
            customField: "View",
            fields: []
        },
        {
            id: 6,
            taskType: "overall test the text field for assignee",
            customField: "View",
            fields: []
        },
        {
            id: 7,
            taskType: "mobile task",
            customField: "View",
            fields: []
        },
    ]);

    const handleAddCustomField = (field: CustomField) => {
        console.log("New Custom Field Added", field);
        
        if (modalMode === "edit" && selectedTaskType) {
            // Update existing task type with new field
            const updatedData = taskTypeData.map(taskType => 
                taskType.id === selectedTaskType.id 
                    ? { 
                        ...taskType, 
                        fields: [...(taskType.fields || []), field] 
                    }
                    : taskType
            );
            setTaskTypeData(updatedData);
        } else if (modalMode === "add") {
            // For new task type, you might want to create a new task type entry
            console.log("Adding field to new task type:", field);
        }
    };

    const handleView = (row: TaskTypeData) => {
        setSelectedTaskType(row);
        setModalMode("view");
        setShowAddTaskTypeModal(true);
    };

    const handleEdit = (row: TaskTypeData) => {
        setSelectedTaskType(row);
        setModalMode("edit");
        setShowAddTaskTypeModal(true);
    };

    const handleDelete = (row: TaskTypeData) => {
        if (window.confirm(`Are you sure you want to delete "${row.taskType}"?`)) {
            const updatedData = taskTypeData.filter(item => item.id !== row.id);
            setTaskTypeData(updatedData);
            console.log("Deleted:", row.id);
        }
    };

    const handleAddNew = () => {
        setSelectedTaskType(null);
        setModalMode("add");
        setShowAddTaskTypeModal(true);
    };

    const handleCloseModal = () => {
        setShowAddTaskTypeModal(false);
        setSelectedTaskType(null);
        setModalMode("add");
    };

    const totalPages = Math.ceil(taskTypeData.length / itemsPerPage);

    // Table columns based on your screenshot
    const columns = [
        { key: "id", label: "S.No" },
        { key: "taskType", label: "Task Type" },
        { key: "customField", label: "Custom Field" },
        { key: "actions", label: "Actions" },
    ];

    const renderCustomField = (row: TaskTypeData) => (
        <Button
            variant="outline"
            size="sm"
            onClick={() => handleView(row)}
            className="bg-gray-100 dark:bg-gray-800 text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"
        >
            <Eye className="w-4 h-4 mr-1" /> View
        </Button>
    );

    const renderActions = (row: TaskTypeData) => (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 flex items-center gap-1 text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-gray-700"
                onClick={() => handleEdit(row)}
            >
                <Edit className="w-4 h-4" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 flex items-center gap-1 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
                onClick={() => handleDelete(row)}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Top Bar */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Task Type
                    </h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>
                        <ThemeToggle />
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
                                onClick={handleAddNew}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <Plus size={18} />
                                Add Task Type
                            </button>

                            <CustomFieldModal
                                isOpen={showAddTaskTypeModal}
                                onClose={handleCloseModal}
                                onAddField={handleAddCustomField}
                                mode={modalMode}
                                taskTypeData={selectedTaskType}
                            />
                        </div>
                    </div>

                    <TableComponent
                        tableId="task-type-table"
                        columns={columns}
                        data={taskTypeData.map((d) => ({
                            ...d,
                            customField: renderCustomField(d),
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

export default TaskType;