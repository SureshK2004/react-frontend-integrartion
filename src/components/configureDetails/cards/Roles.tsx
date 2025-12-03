import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableComponent from "@/components/common/TableComponent";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

import { getRoles } from "@/api/rolesApi";

interface PaginationState {
  next: number | null;
  prev: number | null;
  count: number;
  currentPage: number;
}

const Roles: React.FC = () => {
    const navigate = useNavigate();

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [rolesData, setRolesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState<PaginationState>({
        next: null,
        prev: null,
        count: 0,
        currentPage: 1
    });

    const org_id = 3;

    const fetchRoles = async (cursor: number | null = null, pageDirection: 'next' | 'prev' | 'first' = 'first') => {
        try {
            setLoading(true);
            const res = await getRoles(org_id, cursor, itemsPerPage);

            const apiPagination = res.pagination || {};
            const results = res.results ?? [];

            setRolesData(results);

            let newCurrentPage = pagination.currentPage;
            
            if (pageDirection === 'next' && pagination.next !== null) {
                newCurrentPage = pagination.currentPage + 1;
            } else if (pageDirection === 'prev' && pagination.prev !== null) {
                newCurrentPage = pagination.currentPage - 1;
            } else if (pageDirection === 'first') {
                newCurrentPage = 1;
            }

            setPagination({
                next: apiPagination.next,
                prev: apiPagination.prev,
                count: apiPagination.count || 0,
                currentPage: newCurrentPage
            });

        } catch (error) {
            console.error("Error fetching roles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles(null, 'first');
    }, []);

    useEffect(() => {
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        fetchRoles(null, 'first');
    }, [itemsPerPage]);

    const handlePageChange = (newPage: number) => {
        if (loading) return;

        const currentPage = pagination.currentPage;
        
        if (newPage === currentPage + 1 && pagination.next !== null) {
    
            fetchRoles(pagination.next, 'next');
        } else if (newPage === currentPage - 1 && pagination.prev !== null) {
            
            fetchRoles(pagination.prev, 'prev');
        } else if (newPage === 1) {
           
            fetchRoles(null, 'first');
        }
        
    };

    const handleItemsPerPageChange = (newLimit: number) => {
        setItemsPerPage(newLimit);
    };

    const columns = [
        { key: "sno", label: "S.No" },
        { key: "role_name", label: "Role Name" },
    ];

    const getSerialNumber = (index: number) => {
        return (pagination.currentPage - 1) * itemsPerPage + (index + 1);
    };

    const totalPages = Math.ceil(pagination.count / itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
            <div className="max-w-7xl mx-auto">

                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Roles List
                        </h2>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                            >
                                <ArrowLeft size={18} /> Back
                            </button>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border">

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Tables
                    </h2>

                    <TableComponent
                        tableId="roles-table-details"
                        columns={columns}
                        data={rolesData.map((d, idx) => ({
                            ...d,
                            sno: getSerialNumber(idx),
                        }))}
                        currentPage={pagination.currentPage}
                        totalPages={totalPages}
                        totalCount={pagination.count}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default Roles;