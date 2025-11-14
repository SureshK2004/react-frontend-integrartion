import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, Download, Edit, Eye, Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import AddModal from "./AddModal";
import ViewMembersModal from "./ViewMembersModal";
import UploadModal from "./UploadModal";
import { BsMicrosoftTeams } from "react-icons/bs";

const TeamDetails: React.FC = () => {
    const navigate = useNavigate();

    // Modal states
    const [showAddTeamModal, setShowAddTeamModal] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showMembersModal, setShowMembersModal] = useState(false);

    const [selectedTeamMembers, setSelectedTeamMembers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleFileUpload = (file: File) => {
        console.log("Uploaded File:", file);
        // later you can parse it or send to backend
    };
    const handleAdd = (data: any) => {
        console.log("New Team Added", data);
    };
    // Dummy Team Data65 
    const teamData = [
        {
            id: 1,
            teamName: "Team Alpha",
            members: [
                { id: 1, empId: "EMP101", fullName: "John Doe" },
                { id: 2, empId: "EMP102", fullName: "Jane Smith" },
            ],
        },
        {
            id: 2,
            teamName: "Team Beta",
            members: [
                { id: 1, empId: "EMP201", fullName: "Alice Johnson" },
                { id: 2, empId: "EMP202", fullName: "Robert Brown" },
            ],
        },
        {
            id: 3,
            teamName: "Team Gamma",
            members: [
                { id: 1, empId: "EMP301", fullName: "Sophia Davis" },
                { id: 2, empId: "EMP302", fullName: "Michael Lee" },
            ],
        },
    ];

    const totalPages = Math.ceil(teamData.length / itemsPerPage);

    // Table columns
    const columns = [
        { key: "id", label: "S.No" },
        { key: "teamName", label: "Team Name" },
        { key: "addMembers", label: "Add Members" },
        { key: "viewMembers", label: "View / Remove Members" },
        { key: "actions", label: "Actions" },
    ];
    const viewColumns = [
        { key: "id", label: "S.No" },
        { key: "empId", label: "Employee ID" },
        { key: "fullName", label: "Full Name" },
        { key: "actions", label: "Actions" },
    ];
    // Table row renderers
    const renderAddMembers = (row: any) => (
        <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddTeamModal(true)}
            className="bg-gray-100 dark:bg-gray-800 text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-gray-700"
        >
            <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
    );

    const renderViewMembers = (row: any) => (
        <Button
            variant="outline"
            size="sm"
            onClick={() => {
                setSelectedTeamMembers(row.members);
                setShowMembersModal(true);
            }}
            className="bg-gray-100 dark:bg-gray-800 text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"
        >
            <Eye className="w-4 h-4 mr-1" /> View / Remove
        </Button>
    );
    // 🧩 Add this inside TeamDetails before return
    const renderViewActions = (row: any) => (
        <Button
            variant="outline"
            size="sm"
            className="bg-gray-100 dark:bg-gray-800 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
            onClick={() => console.log("Remove member:", row.fullName)}
        >
            <Trash2 className="w-4 h-4 mr-1" /> Remove
        </Button>
    );

    const renderActions = (row: any) => (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800  flex items-center gap-1 text-green-600 border-green-600"
                onClick={() => console.log("Edit", row.id)}
            >
                <Edit className="w-4 h-4" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 flex items-center gap-1 text-red-600 border-red-600 "
                onClick={() => console.log("Delete", row.id)}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    );

    const handleAddMember = (data: any) => {
        console.log("New Member Added:", data);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Top Bar */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Team Details
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
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <Download size={18} />
                                Download Template
                            </button>
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <Upload size={18} />
                                Upload Excel
                            </button>
                            <UploadModal
                                title="Upload Holiday Excel"
                                isOpen={showUploadModal}
                                onClose={() => setShowUploadModal(false)}
                                onSubmit={handleFileUpload}
                            />

                            <button
                                onClick={() => setShowAddMemberModal(true)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <BsMicrosoftTeams size={18} />
                                Add Team
                            </button>

                            <AddModal
                                title="Add Holiday"
                                isOpen={showAddMemberModal}
                                onClose={() => setShowAddMemberModal(false)}
                                onSubmit={handleAdd}
                                fields={[
                                    { label: "Team Name", key: "teamName" },
                                ]}
                            />
                        </div>
                    </div>

                    <TableComponent
                        tableId="team-details-table"
                        columns={columns}
                        data={teamData.map((d) => ({
                            ...d,
                            addMembers: renderAddMembers(d),
                            viewMembers: renderViewMembers(d),
                            actions: renderActions(d),
                        }))}
                        currentPage={page}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setPage}
                    />
                </div>

                {/* Add Member Modal */}
                <AddModal
                    title="Add Member"
                    isOpen={showAddTeamModal}
                    onClose={() => setShowAddTeamModal(false)}
                    onSubmit={handleAddMember}
                    fields={[
                        {
                            label: "Select Employee",
                            key: "employee",
                            type: "select",
                            options: [
                                "John Doe",
                                "Jane Smith",
                                "Alice Johnson",
                                "Michael Lee",
                            ],
                        },
                    ]}
                />

                {/* View Members Modal */}
                <ViewMembersModal
                    isOpen={showMembersModal}
                    onClose={() => setShowMembersModal(false)}
                    members={selectedTeamMembers}
                    columns={viewColumns}
                    renderActions={renderViewActions}

                />
            </div>
        </div>
    );
};

export default TeamDetails;
