import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import {
    ArrowBigDownDash,
    ArrowLeft,
    Download,
    DownloadCloud,
    Edit,
    Trash2,
    Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import AddModal from "./AddModal";

const LeaveList: React.FC = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const handleAdd = (data: any) => {
        console.log("New Leave Added", data);
    };

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // ✅ Dummy Data
    const leaveData = [
        {
            id: 1,
            leaveName: "Casual Leave",
            totalLeave: 12,
            Monthly_Yearly: "Monthly",
            carryForward: "Yes",
            carryForwardLimit: 6,
        },
        {
            id: 2,
            leaveName: "Sick Leave",
            totalLeave: 10,
            Monthly_Yearly: "Monthly",
            carryForward: "No",
            carryForwardLimit: 0,
        },
        {
            id: 3,
            leaveName: "Earned Leave",
            totalLeave: 15,
            Monthly_Yearly: "Monthly",
            carryForward: "Yes",
            carryForwardLimit: 10,
        },
        {
            id: 4,
            leaveName: "Maternity Leave",
            totalLeave: 180,
            Monthly_Yearly: "Monthly",
            carryForward: "No",
            carryForwardLimit: 0,
        },
        {
            id: 5,
            leaveName: "Paternity Leave",
            totalLeave: 10,
            Monthly_Yearly: "Monthly",
            carryForward: "No",
            carryForwardLimit: 0,
        },
        {
            id: 6,
            leaveName: "Comp Off",
            totalLeave: "Flexible",
            Monthly_Yearly: "Monthly",
            carryForward: "Yes",
            carryForwardLimit: 3,
        },
    ];

    const totalPages = Math.ceil(leaveData.length / itemsPerPage);

    const columns = [
        { key: "id", label: "S.No" },
        { key: "leaveName", label: "Leave Name" },
        { key: "totalLeave", label: "Total Leave" },
        { key: "Monthly_Yearly", label: "Monthly / Yearly" },
        { key: "carryForward", label: "Carry Forward" },
        { key: "carryForwardLimit", label: "Carry Forward Limit" },
        { key: "actions", label: "Actions" },
    ];

    // ✅ Action Buttons
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
                {/* ✅ Header Section */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Leave List
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
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <Download size={18} />
                                Leave Policy
                            </button>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <ArrowBigDownDash size={18} />
                                Add Leave
                            </button>

                            <AddModal
                                title="Add Leave"
                                isOpen={showAddModal}
                                onClose={() => setShowAddModal(false)}
                                onSubmit={handleAdd}
                                fields={[
                                    { label: "Leave Name", key: "leaveName" },
                                    { label: "Total Leave", key: "totalLeave" },
                                    { label: "Yearly / Monthly", key: "Monthly_Yearly" },
                                    { label: "Carry Forward", key: "carryForward" },
                                    { label: "Carry Forward Limit", key: "carryForwardLimit" },
                                ]}
                            />
                        </div>
                    </div>

                    <TableComponent
                        tableId="leave-table-details"
                        columns={columns}
                        data={leaveData.map((d) => ({
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

export default LeaveList;
