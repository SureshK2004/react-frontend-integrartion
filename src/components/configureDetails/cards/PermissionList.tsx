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

const PermissionList: React.FC = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const handleAdd = (data: any) => {
        console.log("New Permission Added", data);
    };

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // ✅ Dummy Permission Data
    const permissionData = [
        {
            id: 1,
            permissionName: "Personal Work",
            totalPermission: 2,
            dateTime: "2025-01-10 09:00 AM - 11:00 AM",
            type: "Monthly",
        },
        {
            id: 2,
            permissionName: "Doctor Visit",
            totalPermission: 3,
            dateTime: "2025-02-18 10:00 AM - 12:00 PM",
            type: "Yearly",
        },
        {
            id: 3,
            permissionName: "Family Function",
            totalPermission: 1,
            dateTime: "2025-03-05 03:00 PM - 05:00 PM",
            type: "Monthly",
        },
        {
            id: 4,
            permissionName: "Bank Work",
            totalPermission: 2,
            dateTime: "2025-04-11 02:00 PM - 04:00 PM",
            type: "Monthly",
        },
        {
            id: 5,
            permissionName: "Sucide",
            totalPermission: 5,
            dateTime: "2025-05-09 09:00 AM - 10:00 AM",
            type: "monthly",
        },
        {
            id: 6,
            permissionName: "Emergency",
            totalPermission: 5,
            dateTime: "2025-05-09 09:00 AM - 10:00 AM",
            type: "Yearly",
        },
    ];

    const totalPages = Math.ceil(permissionData.length / itemsPerPage);

    const columns = [
        { key: "id", label: "S.No" },
        { key: "permissionName", label: "Permission Name" },
        { key: "totalPermission", label: "Total Permission" },
        { key: "dateTime", label: "Date / Time" },
        { key: "type", label: "Yearly / Monthly" },
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
                                Permission List
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
                                Add Permission
                            </button>

                            <AddModal
                                title="Add Permission"
                                isOpen={showAddModal}
                                onClose={() => setShowAddModal(false)}
                                onSubmit={handleAdd}
                                fields={[
                                    { label: "Permission Name", key: "permissionName" },
                                    {
                                        label: "Type",
                                        key: "permissionType",
                                        type: "radio",
                                        options: ["Time-based", "Date-based"],
                                    },
                                    {
                                        label: "Number of Permissions",
                                        key: "totalPermission",
                                        type: "number",
                                    },{
                                        label: "Location",
                                        key: "location",
                                        type: "select",
                                        options: ["Monthly","Yearly"],
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <TableComponent
                        tableId="permission-table-details"
                        columns={columns}
                        data={permissionData.map((d) => ({
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

export default PermissionList;
