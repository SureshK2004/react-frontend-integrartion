import React, { useEffect, useState } from "react";
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
import {
    getShiftTimes,
    createShiftTime,
    updateShiftTime,
    deleteShiftTime,
} from "@/api/shift_timeApi";

const ShiftTime: React.FC = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [shiftTimeData, setShiftTimeData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const org_id = 3;

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setPage(1); // reset to first page
    };

    useEffect(() => {
        fetchShiftTimes();
    }, [page, itemsPerPage]);



    // Fetch shift times
    const fetchShiftTimes = async () => {
        try {
            const res = await getShiftTimes(org_id, page, itemsPerPage);

            const list = res?.data || [];

            setShiftTimeData(list);

            // NEW: handle pagination from API
            const total = res?.total_count || 0;
            setTotalCount(total);
            setTotalPages(Math.ceil(total / itemsPerPage));
        } catch (error) {
            console.error("Error fetching shift time list:", error);
        }
    };


    // Handle Add/Edit/Delete
    const handleAdd = async (data: any) => {
        try {
            if (modalMode === "add") {
                console.log("POST → New Shift:", data);
                await createShiftTime({
                    org_id,
                    shift_name: data.shiftName,
                    start_time: data.startTime,
                    end_time: data.endTime
                });
            } else if (modalMode === "edit") {
                console.log("PUT → Update Shift:", { shift_id: selectedItem?.shift_id, ...data });
                await updateShiftTime({
                    shift_id: selectedItem?.shift_id,
                    org_id,
                    shift_name: data.shiftName,
                    start_time: data.startTime,
                    end_time: data.endTime
                });
            } else if (modalMode === "delete") {
                console.log("DELETE → Shift:", selectedItem?.shift_id);
                await deleteShiftTime(selectedItem?.shift_id, org_id);
            }
            setShowAddModal(false);
            setSelectedItem(null);
            fetchShiftTimes(); // refresh table
        } catch (error) {
            console.error("Error performing action:", error);
        }
    };



    const columns = [
        { key: "sno", label: "S.No" },
        { key: "shift_name", label: "Shift Name" },
        { key: "start_time", label: "Start Time" },
        { key: "end_time", label: "End Time" },
        { key: "actions", label: "Actions" },
    ];

    const handleEdit = (row: any) => {
        setModalMode("edit");
        setSelectedItem(row);
        setShowAddModal(true);
    };

    const handleDelete = (row: any) => {
        setModalMode("delete");
        setSelectedItem(row);
        setShowAddModal(true);
    };

    // Format time for display (optional)
    const formatTimeForDisplay = (timeString: string) => {
        if (!timeString) return '';
        // Convert "HH:MM:SS" to "HH:MM AM/PM" format
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    };

    const renderActions = (row: any) => (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 flex items-center gap-1 text-green-600 border-green-600"
                onClick={() => handleEdit(row)}
            >
                <Edit className="w-4 h-4" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 flex items-center gap-1 text-red-600 border-red-600"
                onClick={() => handleDelete(row)}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    );

    // Define fields based on modalMode
    const getModalFields = () => {
        if (modalMode === "delete") {
            return [];
        }
        return [
            {
                label: "Shift Name",
                key: "shiftName",
                value: selectedItem?.shift_name || ""
            },
            {
                label: "Start Time",
                key: "startTime",
                type: "time",
                value: selectedItem?.start_time || ""
            },
            {
                label: "End Time",
                key: "endTime",
                type: "time",
                value: selectedItem?.end_time || ""
            },
        ];
    };

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
                                onClick={() => {
                                    setModalMode("add");
                                    setSelectedItem(null);
                                    setShowAddModal(true);
                                }}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <ArrowBigDownDash size={18} />
                                Add Shift
                            </button>
                        </div>
                    </div>

                    {/* Shared Modal for Add/Edit/Delete */}
                    <AddModal
                        title={
                            modalMode === "add"
                                ? "Add Shift"
                                : modalMode === "edit"
                                    ? "Edit Shift"
                                    : "Delete Shift"
                        }
                        isOpen={showAddModal}
                        onClose={() => {
                            setShowAddModal(false);
                            setSelectedItem(null);
                        }}
                        onSubmit={handleAdd}
                        fields={getModalFields()}
                        isDelete={modalMode === "delete"}
                    />

                    <TableComponent
                        tableId="shift-table-details"
                        columns={columns}
                        data={shiftTimeData.map((d, i) => ({
                            ...d,
                            sno: (page - 1) * itemsPerPage + (i + 1),
                            start_time: formatTimeForDisplay(d.start_time),
                            end_time: formatTimeForDisplay(d.end_time),
                            actions: renderActions(d),
                        }))}

                        currentPage={page}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        totalCount={totalCount}

                        onPageChange={setPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />

                </div>
            </div>
        </div>
    );
};

export default ShiftTime;
