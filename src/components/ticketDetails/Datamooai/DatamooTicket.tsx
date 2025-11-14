import React, { useState } from "react";
import TableComponent from "@/components/common/TableComponent";
import PopupModal from "@/components/common/PopupModal";
import { BuildingIcon, ShowerHead } from "lucide-react";
import { Button } from "@/components/ui/button";
import QueryModal from "@/components/common/QueryModal";

const DatamooTicket: React.FC = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    // Handle Re-Assign Submit
    const handleReassign = (formData: any) => {
        const selectedTicketIds = Array.from(selectedRows);
        console.log("🧾 Reassigning Tickets:", selectedTicketIds);
        console.log("📦 Form Data:", formData);

        // You can later replace this with an API call
        // e.g. updateAssignedUsers(selectedTicketIds, formData.assignuser)

        // Close modal and clear selection
        setShowAddModal(false);
        setSelectedRows(new Set());
    };
    // 🔹 Selected Row for Query
    const [selectedQuery, setSelectedQuery] = useState<any>(null);

    // Tabs
    const [activeTab, setActiveTab] = useState<"assigned" | "yetAssigned">("assigned");

    // Pagination
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    // 🔹 Mock Data
    const assignedTickets = [
        {
            id: 1,
            userName: "Priya",
            ticketId: "T001",
            date: "2025-10-30",
            org: "Datamoo.ai",
            assignedUser: "Loga",
            query: "API integration issue",
            attachment: "View",
            status: "Solved",
            resolutionTime: "3 hrs",
            slaStatus: "Within SLA",
        },
        {
            id: 2,
            userName: "Arun",
            ticketId: "T002",
            date: "2025-10-29",
            org: "Datamoo.ai",
            assignedUser: "Aish",
            query: "Login problem",
            attachment: "View",
            status: "Pending",
            resolutionTime: "–",
            slaStatus: "Breached",
        },
        {
            id: 3,
            userName: "Divya",
            ticketId: "T003",
            date: "2025-10-28",
            org: "Datamoo.ai",
            assignedUser: "Vikram",
            query: "UI not loading",
            attachment: "View",
            status: "In Progress",
            resolutionTime: "–",
            slaStatus: "Within SLA",
        },
        {
            id: 4,
            userName: "Karan",
            ticketId: "T004",
            date: "2025-10-27",
            org: "Datamoo.ai",
            assignedUser: "Meena",
            query: "Email notification issue",
            attachment: "View",
            status: "Solved",
            resolutionTime: "2 hrs",
            slaStatus: "Within SLA",
        },
        {
            id: 5,
            userName: "Sneha",
            ticketId: "T005",
            date: "2025-10-26",
            org: "Datamoo.ai",
            assignedUser: "Ravi",
            query: "Data sync failed",
            attachment: "View",
            status: "Pending",
            resolutionTime: "–",
            slaStatus: "Breached",
        },
        {
            id: 6,
            userName: "Manoj",
            ticketId: "T006",
            date: "2025-10-25",
            org: "Datamoo.ai",
            assignedUser: "Priya",
            query: "Slow system performance",
            attachment: "View",
            status: "In Progress",
            resolutionTime: "–",
            slaStatus: "Within SLA",
        },
        {
            id: 7,
            userName: "Deepa",
            ticketId: "T007",
            date: "2025-10-24",
            org: "Datamoo.ai",
            assignedUser: "Loga",
            query: "Password reset not working",
            attachment: "View",
            status: "Solved",
            resolutionTime: "1.5 hrs",
            slaStatus: "Within SLA",
        },
        {
            id: 8,
            userName: "Vignesh",
            ticketId: "T008",
            date: "2025-10-23",
            org: "Datamoo.ai",
            assignedUser: "Aish",
            query: "Access denied issue",
            attachment: "View",
            status: "Pending",
            resolutionTime: "–",
            slaStatus: "Breached",
        },
        {
            id: 9,
            userName: "Nisha",
            ticketId: "T009",
            date: "2025-10-22",
            org: "Datamoo.ai",
            assignedUser: "Meena",
            query: "Report generation failed",
            attachment: "View",
            status: "In Progress",
            resolutionTime: "–",
            slaStatus: "Within SLA",
        },
        {
            id: 10,
            userName: "Rahul",
            ticketId: "T010",
            date: "2025-10-21",
            org: "Datamoo.ai",
            assignedUser: "Ravi",
            query: "Billing mismatch",
            attachment: "View",
            status: "Solved",
            resolutionTime: "4 hrs",
            slaStatus: "Within SLA",
        },
    ];


    const yetAssignedTickets = [
        {
            id: 1,
            userName: "Mani",
            ticketId: "T003",
            date: "2025-10-28",
            org: "Datamoo.ai",
            assignedUser: "-",
            query: "Payment failed",
            attachment: "None",
            status: "Open",
            resolutionTime: "-",
            slaStatus: "Pending",
        },
    ];
    // 🔹 Columns
    const columns = [
        { key: "userName", label: "User Name" },
        { key: "ticketId", label: "Ticket ID" },
        { key: "date", label: "Date" },
        { key: "org", label: "Org" },
        { key: "assignedUser", label: "Assigned User" },
        { key: "query", label: "Query" },
        { key: "attachment", label: "Attachment" },
        { key: "status", label: "Status" },
        { key: "resolutionTime", label: "Resolution Time" },
        { key: "slaStatus", label: "SLA Status" },
    ];
    const [showQuery, setShowQuery] = useState(false)
    const renderShowQuery = (row: any) => (
        <Button
            variant="outline"
            size="sm"
            onClick={() => {
                setSelectedQuery(row);
                setShowQuery(true);
            }}
            className="dark:bg-white text-primary border-primary dark:hover:bg-gray-700"
        >
            <BuildingIcon className="w-4 h-4 mr-1" /> query
        </Button >
    );
    const renderAttachment = () => {

    }
    // 🔹 Pagination logic
    const currentData =
        activeTab === "assigned"
            ? assignedTickets.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            : yetAssignedTickets.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const totalPages = Math.ceil(
        (activeTab === "assigned" ? assignedTickets.length : yetAssignedTickets.length) / itemsPerPage
    );
    // ✅ Row selection state
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = (total: number) => {
        if (selectAll) {
            setSelectedRows(new Set());
        } else {
            const allRows = new Set(
                currentData.map((_, idx) => (page - 1) * itemsPerPage + idx)
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

    return (
        <div className="space-y-4">
            {/* 🔹 Tab Switch */}
            <div className="flex gap-3 mb-4">
                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === "assigned"
                        ? "bg-primary text-white shadow-md"
                        : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600"
                        }`}
                    onClick={() => {
                        setActiveTab("assigned");
                        setPage(1);
                    }}

                >
                    Assigned Tickets
                </button>
                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === "yetAssigned"
                        ? "bg-primary text-white shadow-md"
                        : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600"
                        }`}
                    onClick={() => {
                        setActiveTab("yetAssigned");
                        setPage(1);
                    }}
                >
                    Yet Assigned Tickets
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Tables
                        </h2>
                    </div>

                    {/* {re-assign] [assign,delete] */}
                    <div className="flex items-center justify-end gap-3">
                        {activeTab === 'assigned' ? (
                            <button
                                onClick={() => {
                                    if (selectedRows.size > 0) {
                                        setShowAddModal(true);
                                    }
                                }}
                                disabled={selectedRows.size === 0}
                                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 
                                         ${selectedRows.size > 0
                                        ? "bg-primary text-white hover:bg-blue-700"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Re-assign
                            </button>
                        ) : (
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    // onClick={() => { setShowAddModal(true) }}
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white
                                bg-primary  rounded-lg  hover:bg-blue-700
                                transition-colors duration-200"
                                >

                                    Assign Ticket
                                </button>
                                <button
                                    // onClick={() => { setShowAddModal(true) }}
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white
                                bg-primary  rounded-lg  hover:bg-blue-700
                                transition-colors duration-200"
                                >

                                    Delete Ticket
                                </button>

                            </div>
                        )}
                        {/* for reassign */}
                        <PopupModal
                            title="Re-assign"
                            isOpen={showAddModal}
                            onClose={() => setShowAddModal(false)}
                            onSubmit={handleReassign}
                            fields={[
                                {
                                    label: "Assign User",
                                    key: "assignuser",
                                    type: "select",
                                    options: ["Ram", "Akash", "Abhishek", "Suresh", "Anbu", "Ranjitha"],
                                },
                                {
                                    label: "Priority Level",
                                    key: "priority",
                                    type: "select",
                                    options: ["High", "Medium", "Low",],
                                },

                            ]}
                        />
                        {/* for query */}
                        <QueryModal
                            isOpen={showQuery}
                            onClose={() => setShowQuery(false)}
                            queryData={selectedQuery}
                        />
                    </div>
                </div>

                <TableComponent
                    tableId="datamoo-ticket-table"
                    columns={[
                        ...columns]}
                    data={currentData.map((d) => ({
                        ...d,
                        query: renderShowQuery(d),
                    }))}
                    currentPage={page}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setPage}
                    selectable={true}
                    selectAll={selectAll}
                    selectedRows={selectedRows}
                    onSelectAll={handleSelectAll}
                    onRowSelect={handleRowSelect}
                />
            </div>
        </div>
    );
};

export default DatamooTicket;
