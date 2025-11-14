import React, { useState } from "react";
import TableComponent from "@/components/common/TableComponent";
import PopupModal from "@/components/common/PopupModal";
import QueryModal from "@/components/common/QueryModal";
import { Button } from "@/components/ui/button";

const SelfTicket: React.FC = () => {
    // 🔹 Modal states
    const [showRaiseModal, setShowRaiseModal] = useState(false);
    const [showQuery, setShowQuery] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState<any>(null);

    // 🔹 Mock Ticket Data
    const userTickets = [
        {
            id: 1,
            userName: "Abbas Ali",
            ticketId: "T101",
            date: "2025-10-14",
            org: "Datamoo",
            assignedUser: "Abbas Ali",
            query: "Login issue while accessing dashboard",
            attachment: "View",
            status: "Solved",
        },
        {
            id: 2,
            userName: "Abbas Ali",
            ticketId: "T102",
            date: "2025-10-20",
            org: "Datamoo",
            assignedUser: "Ravi",
            query: "Report download failed",
            attachment: "None",
            status: "Pending",
        },
    ];

    // 🔹 Pagination
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(userTickets.length / itemsPerPage);
    const currentData = userTickets.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
    ];

    // 🔹 Query modal trigger
    const renderQueryButton = (row: any) => (
        <Button
            variant="outline"
            size="sm"
            onClick={() => {
                setSelectedQuery(row);
                setShowQuery(true);
            }}
            className="bg-gray-100 dark:bg-gray-800 text-primary border-primary hover:bg-green-50 dark:hover:bg-gray-700"
        >
            View Query
        </Button>
    );

    // 🔹 Handle Raise Ticket
    const handleRaiseTicket = (formData: any) => {
        console.log("🎫 Ticket Raised:", formData);
        setShowRaiseModal(false);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Tickets</h2>

                <Button
                    onClick={() => setShowRaiseModal(true)}
                    className="bg-primary text-white hover:bg-blue-700 rounded-lg px-4 py-2 text-sm font-medium"
                >
                    Raise Ticket
                </Button>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <TableComponent
                    tableId="self-ticket-table"
                    columns={[
                        ...columns.slice(0, 5),
                        {
                            key: "query",
                            label: "Query",
                            render: (row: any) => renderQueryButton(row),
                        },
                        ...columns.slice(6),
                    ]}
                    data={currentData}
                    currentPage={page}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setPage}
                    selectable={false}
                />
            </div>

            {/* Raise Ticket Modal */}
            <PopupModal
                title="Raise Ticket"
                isOpen={showRaiseModal}
                onClose={() => setShowRaiseModal(false)}
                onSubmit={handleRaiseTicket}
                fields={[
                    {
                        label: "Subject",
                        key: "subject",
                        type: "text",
                        placeholder: "Enter the subject of your ticket",
                        required: true,
                    },
                    {
                        label: "Query",
                        key: "query",
                        type: "textarea",
                        placeholder: "Describe your query or issue here",
                        required: true,
                    },
                    {
                        label: "Upload Image",
                        key: "attachment",
                        type: "file",
                    },
                ]}
            />

            {/* Query View Modal */}
            <QueryModal
                isOpen={showQuery}
                onClose={() => setShowQuery(false)}
                queryData={selectedQuery}
            />
        </div>
    );
};

export default SelfTicket;
