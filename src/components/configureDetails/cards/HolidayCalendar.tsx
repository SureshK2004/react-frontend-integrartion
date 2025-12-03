import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

import {
    getHolidays,
    createHoliday,
    updateHoliday,
    deleteHoliday,
} from "@/api/holidaycalendar";

const HolidayCalendar: React.FC = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const [holidayData, setHolidayData] = useState<any[]>([]);
    const [page, setPage] = useState(1);


    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [nextCursor, setNextCursor] = useState<number | null>(null);
    const [prevCursor, setPrevCursor] = useState<number | null>(null);

    const org_id = 3;


    const handleLimitChange = (val: number) => {
        setLimit(val);
        setPage(1);
        fetchHolidays(null);
    };


    const fetchHolidays = async (cursor: number | null) => {
        try {
            const res = await getHolidays(org_id, cursor, limit);

            const list = res?.data || [];

            setHolidayData(
                list.map((ev: any) => ({
                    id: ev.event_id,
                    name: ev.name,
                    fromdate: ev.fromdate,
                    todate: ev.todate,
                }))
            );

            setTotalCount(res?.total_count || 0);
            setNextCursor(res?.next_page);
            setPrevCursor(res?.previous_page);

            setTotalPages(Math.ceil((res?.total_count || 0) / limit));
        } catch (error) {
            console.error("Error fetching holidays:", error);
        }
    };

    useEffect(() => {
        fetchHolidays(null);
    }, [limit]);

    const handlePageChange = (val: number) => {
        if (val === page) return;

        if (val > page) {
            fetchHolidays(nextCursor);
        } else {
            fetchHolidays(prevCursor);
        }

        setPage(val);
    };

 //submit response handling
    const handleSubmit = async (form: any) => {
        try {
            if (modalMode === "add") {
                await createHoliday({
                    name: form.name,
                    fromdate: form.fromdate,
                    todate: form.todate,
                    org_id,
                });
            }

            if (modalMode === "edit") {
                await updateHoliday({
                    id: selectedItem?.id,
                    name: form.name,
                    fromdate: form.fromdate,
                    todate: form.todate,
                    org_id,
                });
            }

            if (modalMode === "delete") {
                await deleteHoliday(selectedItem?.id, org_id);
            }

            setShowModal(false);
            setSelectedItem(null);
            fetchHolidays(null);
        } catch (error) {
            console.error("Error submitting holiday:", error);
        }
    };

  
    const columns = [
        { key: "sno", label: "S.No" },
        { key: "name", label: "Leave Name" },
        { key: "fromdate", label: "From Date" },
        { key: "todate", label: "To Date" },
        { key: "actions", label: "Actions" },
    ];

  
    const renderActions = (row: any) => (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600"
                onClick={() => {
                    setModalMode("edit");
                    setSelectedItem(row);
                    setShowModal(true);
                }}
            >
                <Edit className="w-4 h-4" />
            </Button>

            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 text-red-600 border-red-600"
                onClick={() => {
                    setModalMode("delete");
                    setSelectedItem(row);
                    setShowModal(true);
                }}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
            <div className="max-w-7xl mx-auto">

                
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Holiday Calendar
                        </h2>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg"
                            >
                                <ArrowLeft size={18} /> Back
                            </button>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border">

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Tables
                        </h2>

                        <button
                            onClick={() => {
                                setModalMode("add");
                                setSelectedItem(null);
                                setShowModal(true);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg"
                        >
                            <ArrowBigDownDash size={18} /> Add Holiday
                        </button>
                    </div>

                
                    <AddModal
                        title="Add Holiday"
                        isOpen={showModal && modalMode === "add"}
                        onClose={() => setShowModal(false)}
                        onSubmit={(form) => handleSubmit(form)}
                        fields={[
                            { label: "Leave Name", key: "name", type: "text" },
                            { label: "From Date", key: "fromdate", type: "date" },
                            { label: "To Date", key: "todate", type: "date" },
                        ]}
                    />

                    <EditModal
                        title="Edit Holiday"
                        isOpen={showModal && modalMode === "edit"}
                        onClose={() => setShowModal(false)}
                        onSubmit={(form) => handleSubmit(form)}
                        fields={[
                            { label: "Leave Name", key: "name", type: "text" },
                            { label: "From Date", key: "fromdate", type: "date" },
                            { label: "To Date", key: "todate", type: "date" },
                        ]}
                        initialData={{
                            name: selectedItem?.name || "",
                            fromdate: selectedItem?.fromdate || "",
                            todate: selectedItem?.todate || "",
                        }}
                    />

                  
                    <DeleteModal
                        isOpen={showModal && modalMode === "delete"}
                        onClose={() => setShowModal(false)}
                        onConfirm={() => handleSubmit({})}
                        title="Delete Holiday"
                        message="Are you sure you want to delete this holiday?"
                        itemName={selectedItem?.name}
                    />

                    
                    <TableComponent
                        tableId="holiday-table-details"
                        columns={columns}
                        data={holidayData.map((d, i) => ({
                            ...d,
                            sno: (page - 1) * limit + (i + 1),
                            actions: renderActions(d),
                        }))}
                        currentPage={page}
                        totalPages={totalPages}
                        itemsPerPage={limit}
                        totalCount={totalCount}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleLimitChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default HolidayCalendar;
