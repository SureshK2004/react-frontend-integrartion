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

const ProjectList: React.FC = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const handleAdd = (data: any) => {
        console.log("New project Added", data);
    };

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // Dummy Data
    const projectData = [
        { id: 1, projectName: "Employee Portal", location: "Chennai", entity: "TechNova Pvt Ltd" },
        { id: 2, projectName: "CRM Dashboard", location: "Bangalore", entity: "CloudWorks Solutions" },
        { id: 3, projectName: "E-Commerce Platform", location: "Hyderabad", entity: "NextGen Retail" },
        { id: 4, projectName: "Inventory Tracker", location: "Mumbai", entity: "LogiTrack Systems" },
        { id: 5, projectName: "AI Chatbot", location: "Coimbatore", entity: "SmartAI Labs" },
        { id: 6, projectName: "Payroll System", location: "Delhi", entity: "FinEdge Solutions" },
        { id: 7, projectName: "Fleet Management", location: "Pune", entity: "DriveSafe Logistics" },
        { id: 8, projectName: "Healthcare Portal", location: "Kochi", entity: "MediPlus Healthcare" },
        { id: 9, projectName: "Learning Management", location: "Noida", entity: "EduSmart Global" },
        { id: 10, projectName: "Food Delivery App", location: "Chennai", entity: "UrbanEats Pvt Ltd" },
    ];


    const totalPages = Math.ceil(projectData.length / itemsPerPage);

    const columns = [
        { key: "id", label: "S.No" },
        { key: "projectName", label: "Project Name" },
        { key: "location", label: "Location" },
        { key: "entity", label: "Entity" },
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
                                project Details
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
                                Add Project
                            </button>

                            <AddModal
                                title="Add project"
                                isOpen={showAddModal}
                                onClose={() => setShowAddModal(false)}
                                onSubmit={handleAdd}
                                fields={[
                                    { label: "Project Name", key: "projectName" },
                                    {
                                        label: "Location",
                                        key: "location",
                                        type: "select",
                                        options: ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Pune"],
                                    },
                                    {
                                        label: "Entity",
                                        key: "entity",
                                        type: "select",
                                        options: [
                                            "TechNova Pvt Ltd",
                                            "CloudWorks Solutions",
                                            "NextGen Retail",
                                            "DriveSafe Logistics",
                                        ],
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <TableComponent
                        tableId="project-table-details"
                        columns={columns}
                        data={projectData.map((d) => ({
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

export default ProjectList;
