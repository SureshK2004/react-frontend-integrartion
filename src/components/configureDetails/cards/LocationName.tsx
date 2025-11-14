import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, ArrowUp, Edit, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import ExportComponent from "@/components/exportOption/exportTo";
import AddModal from "./AddModal";
import UploadModal from "./UploadModal";

const LocationName: React.FC = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false)
    const handleAdd = (data: any) => {
        console.log('New location Added', data);
    }
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleFileUpload = (file: File) => {
        console.log("Uploaded File:", file);
    };

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // Dummy data
    const LocationData = [
        { id: 1, location: "tambaram" },
        { id: 2, location: "sanitoriam" },
        { id: 3, location: "chrompet" },
        { id: 4, location: "pallavaram" },
        { id: 5, location: "tirsulam" },
        { id: 6, location: "mambalam" },
        { id: 7, location: "st.mount" },
        { id: 8, location: "guindy" },
        { id: 9, location: "kodambakam" },
        { id: 10, location: "nungabakkam" },
        { id: 11, location: "chetpet" },
        { id: 12, location: "egmore" },
    ];

    const totalPages = Math.ceil(LocationData.length / itemsPerPage);

    const columns = [
        { key: "id", label: "S.No" },
        { key: "location", label: "location" },
        { key: "actions", label: "Actions" },
    ];

    // Render actions per row
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Top Bar */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                locations Details
                            </h2>
                        </div>

                        {/* Back Button and Theme Toggle */}
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
                <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                    <div className="flex items-center justify-between">

                        <div className="flex flex-col space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Tables
                            </h2>
                        </div>
                        <div className="flex items-center justify-end gap-3">
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
                                title="Upload Holiday Excel"
                                isOpen={showUploadModal}
                                onClose={() => setShowUploadModal(false)}
                                onSubmit={handleFileUpload}
                            />

                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <ArrowBigDownDash size={18} />
                                Add location
                            </button>
                            <AddModal
                                title="Add location"
                                isOpen={showAddModal}
                                onClose={() => setShowAddModal(false)}
                                onSubmit={handleAdd}
                                fields={[{ label: "location Name", key: "location" }]}
                            />
                        </div>
                    </div>
                    {/* Table Section */}
                    <TableComponent
                        tableId="location-table-detials"
                        columns={columns}
                        data={LocationData.map((d) => ({
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

export default LocationName;
