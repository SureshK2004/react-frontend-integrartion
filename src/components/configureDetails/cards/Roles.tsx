import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, Upload } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const Roles: React.FC = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    // Dummy table data for roles
    const rolesData = [
        { id: 1, role: "Admin", },
        { id: 2, role: "HR", },
        { id: 3, role: "Technician", },
        { id: 4, role: "Supervisor", },
        { id: 5, role: "Supervisor", },
        { id: 6, role: "Supervisor", },
        { id: 7, role: "Supervisor", },
        { id: 8, role: "Supervisor", },
        { id: 9, role: "Supervisor", },
        { id: 10, role: "Supervisor", },
        { id: 11, role: "Supervisor", },
        { id: 12, role: "Supervisor", },
        { id: 13, role: "Supervisor", },
        { id: 14, role: "Supervisor", },
        { id: 15, role: "Supervisor", },
    ];
    const totalPages = Math.ceil(rolesData.length / itemsPerPage);

    const columns = [
        { key: "id", label: "S.No" },
        { key: "role", label: "Role Name" },
    ];


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">

            <div className="max-w-7xl mx-auto">
                {/* Top Bar */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Roles Details
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
                    </div>
                    {/* Table Section */}
                    <TableComponent
                        columns={columns}
                        data={rolesData}
                        currentPage={page}
                        totalPages={totalPages}
                        itemsPerPage={5}
                        onPageChange={setPage}

                    />
                </div>
            </div>
        </div>
    );
};

export default Roles;
