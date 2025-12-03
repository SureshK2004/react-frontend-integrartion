import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowLeft, Trash2, Eye, EyeOff, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import CustomFieldModal from "./CustomFieldFormModal";
import ViewCustomFieldsModal from "./ViewCustomFieldModdal";
import {
    getTaskTypes,
    getFormsDropdown,
    createTaskAndCustomField,
    addCustomField,
    deleteCustomField,
    hideTask,
    hardDeleteTask,
    type TaskTypeResponse,
    type FormsDropdownResponse,
    type CustomFieldResponse,
    type TaskTypesResponse
} from "@/api/tasktypeApi";

interface CustomField {
    id: string;
    labelId: number;
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
    isHidden?: boolean;
}

const TaskType: React.FC = () => {
    const navigate = useNavigate();
    const orgId = 3;

    const [showAddTaskTypeModal, setShowAddTaskTypeModal] = useState(false);
    const [showViewFieldsModal, setShowViewFieldsModal] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "view">("add");
    const [selectedTaskType, setSelectedTaskType] = useState<TaskTypeData | null>(null);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [hiddenRows, setHiddenRows] = useState<{ [key: number]: boolean }>({});
    const [loading, setLoading] = useState(false);
    const [formsDropdown, setFormsDropdown] = useState<FormsDropdownResponse[]>([]);
    const [paginationInfo, setPaginationInfo] = useState({
        totalCount: 0,
        totalPages: 0,
        nextPage: null as number | null,
        prevPage: null as number | null,
        currentPage: 1
    });

    const [taskTypeData, setTaskTypeData] = useState<TaskTypeData[]>([]);

    useEffect(() => {
        fetchTaskTypes();
    }, [page, itemsPerPage]);

    useEffect(() => {
        fetchFormsDropdown();
    }, []);

    const fetchTaskTypes = async () => {
        setLoading(true);
        try {
            const response: TaskTypesResponse = await getTaskTypes(orgId, itemsPerPage, page);
            console.log("RAW API Response:", response);

            if (response.success) {
                const transformedData: TaskTypeData[] = response.data.map((item: TaskTypeResponse) => ({
                    id: item.task_id,
                    taskType: item.task_name,
                    customField: "View",
                    fields: transformCustomFields(item.fields || [])
                }));
                setTaskTypeData(transformedData);

                const totalPages = Math.ceil(response.pagination.count / itemsPerPage);
                setPaginationInfo({
                    totalCount: response.pagination.count,
                    totalPages: totalPages,
                    nextPage: response.pagination.next,
                    prevPage: response.pagination.prev,
                    currentPage: page
                });
            }
        } catch (error) {
            console.error("Error fetching task types:", error);
            setTaskTypeData([]);
            setPaginationInfo({
                totalCount: 0,
                totalPages: 0,
                nextPage: null,
                prevPage: null,
                currentPage: 1
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchFormsDropdown = async () => {
        try {
            const response = await getFormsDropdown(orgId);
            setFormsDropdown(response.forms || []);
        } catch (error) {
            console.error("Error fetching forms dropdown:", error);
        }
    };
    const transformCustomFields = (fields: CustomFieldResponse[]): CustomField[] => {
        return fields.map((field, index) => {
            console.log("RAW FIELD FROM API:", field);

            return {
                id: `field-${field.id}-${index}`,
                labelId: field.id,
                fieldName: field.lable_name || "",
                customization: field.is_assignee ? "assignee" : "assigner",
                required: field.is_required ?? false,
                fieldType: mapFieldType(field.lable_type || "text"),
                options: Array.isArray(field.lable_value)
                    ? field.lable_value
                    : []
            };
        });
    };





    const mapFieldType = (apiType: string): CustomField["fieldType"] => {
        const typeMap: { [key: string]: CustomField["fieldType"] } = {
            "Text": "text",
            "DropDown": "select",
            "Upload Photo": "file",
            "Number": "number",
            "Date": "date",
            "TextArea": "textarea"
        };
        return typeMap[apiType] || "text";
    };

    const handleView = (row: TaskTypeData) => {
        setSelectedTaskType(row);
        setShowViewFieldsModal(true);
    };

    const toggleHide = async (id: number) => {
        const isCurrentlyHidden = hiddenRows[id];
        const action = isCurrentlyHidden ? "show" : "hide";

        try {
            const response = await hideTask(orgId, {
                task_id: id,
                action: action
            });

            if (response.success) {
                setHiddenRows(prev => ({
                    ...prev,
                    [id]: !isCurrentlyHidden
                }));
                fetchTaskTypes();
                alert(`Task ${action === "hide" ? "hidden" : "shown"} successfully!`);
            } else {
                alert(`Failed to ${action} task. Please try again.`);
            }
        } catch (error: any) {
            console.error(`Error ${action} task:`, error);
            const errorMessage = error.response?.data?.message || error.message || `Failed to ${action} task`;
            alert(`Error: ${errorMessage}`);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to permanently delete this task type?")) {
            try {
                const response = await hardDeleteTask(orgId, id);
                if (response.success) {
                    fetchTaskTypes();
                    alert("Task type deleted successfully!");
                } else {
                    alert("Failed to delete task type. Please try again.");
                }
            } catch (error: any) {
                console.error("Error deleting task:", error);
                const errorMessage = error.response?.data?.message || error.message || "Failed to delete task";
                alert(`Error: ${errorMessage}`);
            }
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

    const handleCloseViewModal = () => {
        setShowViewFieldsModal(false);
        setSelectedTaskType(null);
    };

    const handleDeleteField = async (taskTypeId: number, fieldId: string) => {
        console.log("Delete field called:", { taskTypeId, fieldId });

        const field = selectedTaskType?.fields?.find(f => f.id === fieldId);
        console.log("Found field:", field);

        if (!field) {
            alert("Field not found!");
            return;
        }

        if (!field.labelId) {
            console.error("Invalid labelId:", field.labelId);
            alert("Invalid field configuration. Cannot delete.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this field?")) return;

        try {
            console.log("Calling delete API with:", {
                task_type_id: taskTypeId,
                label_id: field.labelId
            });

            const response = await deleteCustomField({
                task_type_id: taskTypeId,
                label_id: field.labelId
            });

            console.log("Delete API response:", response);

            if (response.success) {
                const updatedFields = selectedTaskType?.fields?.filter(f => f.id !== fieldId);
                setSelectedTaskType({
                    ...selectedTaskType!,
                    fields: updatedFields
                });

                await fetchTaskTypes();
                alert("Custom field deleted successfully!");
            } else {
                alert(`Delete failed: ${response.message || "Unknown error"}`);
            }
        } catch (err: any) {
            console.error("Delete error:", err);
            alert(`Error: ${err.response?.data?.message || err.message}`);
        }
    };


    const handleAddFieldToTaskType = async (field: CustomField) => {
        if (selectedTaskType) {
            try {
                const response = await addCustomField({
                    org_id: orgId,
                    task_id: selectedTaskType.id,
                    field_name: field.fieldName,
                    action: "add"
                });

                if (response.success) {
                    fetchTaskTypes();
                    alert("Custom field added successfully!");
                } else {
                    alert("Failed to add custom field. Please try again.");
                }
            } catch (error: any) {
                console.error("Error adding custom field:", error);
                const errorMessage = error.response?.data?.message || error.message || "Failed to add custom field";
                alert(`Error: ${errorMessage}`);
            }
        }
    };

    const handleCreateTaskType = async (taskData: {
        taskName: string;
        isCsat: boolean;
        csatRequired: boolean;
        formId?: number;
        fields: CustomField[];
    }) => {
        try {
            const createPayload: any = {
                task_name: taskData.taskName,
                is_csat: taskData.isCsat,
                csat_required: taskData.csatRequired,
                org_id: orgId
            };

            if (taskData.formId) {
                createPayload.form_id = taskData.formId;
            }

            if (taskData.fields.length > 0) {
                const firstField = taskData.fields[0];
                createPayload.field_name = firstField.fieldName;
                createPayload.field_type = firstField.fieldType;
                createPayload.label_value = firstField.fieldName;
                createPayload.customization = firstField.customization === "assignee" ? "Assignee" : "Assigner";
                createPayload.required = firstField.required;

                if (firstField.fieldType === "select" && firstField.options) {
                    createPayload.label_value = firstField.options.join(",");
                }
            }

            const response = await createTaskAndCustomField(createPayload);

            if (taskData.fields.length > 1) {
                const taskId = response.data?.task_type_id;
                if (!taskId) {
                    throw new Error("No task ID returned from creation");
                }

                for (let i = 1; i < taskData.fields.length; i++) {
                    const field = taskData.fields[i];
                    await addCustomField({
                        org_id: orgId,
                        task_id: taskId,
                        field_name: field.fieldName,
                        action: "add"
                    });
                }
            }

            fetchTaskTypes();
            handleCloseModal();
            alert("Task type created successfully!");
        } catch (error: any) {
            console.error("Error creating task type:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to create task type";
            alert(`Error: ${errorMessage}`);
        }
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const getDisplayRange = () => {
        const start = (page - 1) * itemsPerPage + 1;
        const end = Math.min(page * itemsPerPage, paginationInfo.totalCount);
        return { start, end };
    };

    const { start, end } = getDisplayRange();

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
                className="bg-red-200 dark:bg-gray-800 flex items-center gap-1 
                       text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
                onClick={() => handleDelete(row.id)}
            >
                <Trash2 className="w-4 h-4" />
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={() => toggleHide(row.id)}
                className={`flex items-center gap-1 
                    ${hiddenRows[row.id]
                        ? "bg-green-200 dark:bg-green-800 text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-700"
                        : "bg-gray-200 dark:bg-gray-800 text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"
                    }`}
            >
                {hiddenRows[row.id] ? (
                    <Eye className="w-4 h-4" />
                ) : (
                    <EyeOff className="w-4 h-4" />
                )}
                {hiddenRows[row.id] ? "Show" : "Hide"}
            </Button>
        </div>
    );

    const columns = [
        { key: "sno", label: "S.No" },
        { key: "taskType", label: "Task Type" },
        { key: "customField", label: "Custom Field", render: (row: TaskTypeData) => renderCustomField(row) },
        { key: "actions", label: "Actions", render: (row: TaskTypeData) => renderActions(row) },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
            <div className="max-w-7xl mx-auto">
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

                <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Tables
                        </h2>

                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                            <Plus size={18} />
                            Add Task Type
                        </button>
                    </div>

                    <CustomFieldModal
                        isOpen={showAddTaskTypeModal}
                        onClose={handleCloseModal}
                        mode={modalMode}
                        taskTypeData={selectedTaskType}
                        onAddField={handleAddFieldToTaskType}
                        onCreateTaskType={handleCreateTaskType}
                        formsDropdown={formsDropdown}
                    />

                    <ViewCustomFieldsModal
                        isOpen={showViewFieldsModal}
                        onClose={handleCloseViewModal}
                        taskType={selectedTaskType}
                        onDeleteField={handleDeleteField}
                    />

                    <TableComponent
                        tableId="task-type-table"
                        columns={columns}
                        data={taskTypeData.map((row, index) => ({
                            ...row,
                            sno: (page - 1) * itemsPerPage + (index + 1),
                        }))}
                        currentPage={page}
                        totalPages={paginationInfo.totalPages}
                        itemsPerPage={itemsPerPage}
                        totalCount={paginationInfo.totalCount}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        loading={loading}
                    />

                </div>
            </div>
        </div>
    );
};

export default TaskType;