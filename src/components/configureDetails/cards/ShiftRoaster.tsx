import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowLeft, Download, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import ViewMembersModal from "./ViewMembersModal";
import UploadModal from "./UploadModal";

const ShiftRoaster: React.FC = () => {
    const navigate = useNavigate();
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleFileUpload = (file: File) => {
        console.log("Uploaded File:", file);
    };
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // 🧩 Dummy Shift Roaster Data
    const shiftRoasterData = [
        {
            id: 1,
            date: "2025-10-01",
            shiftName: "Morning Shift",
            teamName: "Team Alpha",
            members: [
                { id: 1, fullName: "John Doe", email: "john@example.com" },
                { id: 2, fullName: "Jane Smith", email: "jane@example.com" },
            ],
        },
        {
            id: 2,
            date: "2025-10-02",
            shiftName: "Evening Shift",
            teamName: "Team Beta",
            members: [
                { id: 1, fullName: "Alice Johnson", email: "alice@example.com" },
                { id: 2, fullName: "Robert Brown", email: "robert@example.com" },
            ],
        },
        {
            id: 3,
            date: "2025-10-03",
            shiftName: "Night Shift",
            teamName: "Team Gamma",
            members: [
                { id: 1, fullName: "Michael Lee", email: "michael@example.com" },
                { id: 2, fullName: "Sophia Davis", email: "sophia@example.com" },
            ],
        },
    ];

    const totalPages = Math.ceil(shiftRoasterData.length / itemsPerPage);

    const columns = [
        { key: "id", label: "S.No" },
        { key: "date", label: "Date" },
        { key: "shiftName", label: "Shift Name" },
        { key: "teamName", label: "Team Name" },
        { key: "viewMembers", label: "View Members" },
    ];
    const viewColumn = [
        { key: "id", label: "S.No" },
        { key: "fullName", label: "Full Name" },
        { key: "email", label: "Email" },
    ]

    const renderActions = (row: any) => (
        <Button
            variant="outline"
            size="sm"
            onClick={() => {
                setSelectedMembers(row.members);
                setShowMembersModal(true);
            }}
            className="bg-gray-100 dark:bg-gray-800 text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"
        >
            <Eye className="w-4 h-4 mr-1" /> View
        </Button>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Top Bar */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Shift Roaster
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
                                
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
             bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 
             transition-colors duration-200"
                            >
                                <Download size={18} />
                                Download Template 
                            </button>
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
             bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 
             transition-colors duration-200"
                            >
                                <Upload size={18} />
                                Upload Excel
                            </button>

                            <UploadModal
                                title="Upload Shift Excel"
                                isOpen={showUploadModal}
                                onClose={() => setShowUploadModal(false)}
                                onSubmit={handleFileUpload}
                            />

                        </div>
                    </div>

                    <TableComponent
                        tableId="shift-roaster-details"
                        columns={columns}
                        data={shiftRoasterData.map((d) => ({
                            ...d,
                            viewMembers: renderActions(d),
                        }))}
                        currentPage={page}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setPage}
                    />
                </div>
                {/* View Members Modal */}
                <ViewMembersModal
                    isOpen={showMembersModal}
                    onClose={() => setShowMembersModal(false)}
                    members={selectedMembers}
                    columns={viewColumn}
                />
            </div>
        </div>
    );
};

export default ShiftRoaster;
