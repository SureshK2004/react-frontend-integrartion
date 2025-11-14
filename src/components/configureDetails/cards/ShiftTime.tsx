import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import {
    ArrowBigDownDash,
    ArrowLeft,
    Edit,
    Trash2,
    Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import AddModal from "./AddModal";

const ShiftTime: React.FC = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const handleAdd = (data: any) => {
        console.log("New Holiday Added", data);
    };

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // Dummy Data
    const shiftTime = [
        { id: 1, shiftName: "Morning Shift", startTime: "06:00 AM", endTime: "02:00 PM" },
        { id: 2, shiftName: "Day Shift", startTime: "09:00 AM", endTime: "05:00 PM" },
        { id: 3, shiftName: "Evening Shift", startTime: "02:00 PM", endTime: "10:00 PM" },
        { id: 4, shiftName: "Night Shift", startTime: "10:00 PM", endTime: "06:00 AM" },
        { id: 5, shiftName: "Split Shift", startTime: "08:00 AM", endTime: "12:00 PM" },
        { id: 6, shiftName: "Weekend Shift", startTime: "09:00 AM", endTime: "03:00 PM" },
        { id: 7, shiftName: "Half-Day Shift", startTime: "09:00 AM", endTime: "01:00 PM" },
        { id: 8, shiftName: "Extended Shift", startTime: "07:00 AM", endTime: "07:00 PM" },
    ];


    const totalPages = Math.ceil(shiftTime.length / itemsPerPage);

    const columns = [
        { key: "id", label: "S.No" },
        { key: "shiftName", label: "Shift Name" },
        { key: "startTime", label: "Start Time" },
        { key: "endTime", label: "End Time" },
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
                                Shift Details
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
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <ArrowBigDownDash size={18} />
                                Add Shift
                            </button>

                            <AddModal
                                title="Add Shift"
                                isOpen={showAddModal}
                                onClose={() => setShowAddModal(false)}
                                onSubmit={handleAdd}
                                fields={[
                                    { label: "Shfit Name", key: "ShiftName" },
                                    { label: "Start Time", key: "starttime", type: "time" },
                                    { label: "End Time", key: "endtime", type: "time" },
                                ]}
                            />
                        </div>
                    </div>

                    <TableComponent
                        tableId="Shift-table-details"
                        columns={columns}
                        data={shiftTime.map((d) => ({
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

export default ShiftTime;
