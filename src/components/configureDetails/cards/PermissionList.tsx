import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import TableComponent from "@/components/common/TableComponent";
import PermissionAddModal from "./PermissionAddModal";
import PermissionEditModal from "./PermissionEditModal";
import DeleteModal from "./DeleteModal";
import { ArrowBigDownDash, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import {
    createPermission,
    deletePermission,
    getPermissionTypes,
    updatePermission,
} from "@/api/permissionlistApi";

const PermissionList: React.FC = () => {
    const navigate = useNavigate();

    const org_id = 3;


    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [nextPage, setNextPage] = useState<number | null>(null);
    const [prevPage, setPrevPage] = useState<number | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

   
    const [permissionData, setPermissionData] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [refresh, setRefresh] = useState(false);

  
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const fetchPermissions = useCallback(async () => {
        try {
            const res = await getPermissionTypes(org_id, itemsPerPage, page);

            if (res.success) {
                const list = res.data || [];

                const mapped = list.map((item: any) => ({
                    ...item,
                    config_label:
                        item.config_type == "1" || item.config_type == 1
                            ? "Monthly"
                            : item.config_type == "2" || item.config_type == 2
                                ? "Yearly"
                                : String(item.config_type || ""),
                }));

                setPermissionData(mapped);

                const pg = res.pagination || {};
                const total = pg.count || 0;

                setNextPage(pg.next);
                setPrevPage(pg.prev);

                setTotalCount(total);
                setTotalPages(Math.ceil(total / itemsPerPage));
            }
        } catch (err) {
            console.error("Fetch Permission Error:", err);
            alert("Failed to fetch permissions");
        }
    }, [page, itemsPerPage]);

    useEffect(() => {
        fetchPermissions();
    }, [page, itemsPerPage, refresh, fetchPermissions]);

    const handleItemsPerPageChange = (limit: number) => {
        setItemsPerPage(limit);
        setPage(1);
    };

  
    const handleAdd = async (formData: any) => {
        try {
            const payload = {
                name: formData.permission_name,               
                no_of_permission: String(formData.no_permission), 
                time_zone: formData.time_zone,
                config_type: formData.config_type,
                org_id,
            };

            const res = await createPermission(payload);

            if (res.success) {
                setRefresh((v) => !v);
            }

            setShowAdd(false);

        } catch (err) {
            console.error("Add Error:", err);
        }
    };


   
    const handleEdit = async (formData: any) => {
        if (!selectedItem) return;

        try {
            const payload = {
                id: selectedItem.id,
                name: formData.permission_name,
                no_of_permission: String(formData.no_permission),
                time_zone: formData.time_zone,
                config_type: formData.config_type,
                org_id,
            };

            const res = await updatePermission(payload);

            if (res.success) {
                alert("Permission updated!");
                setRefresh((v) => !v);
            } else {
                alert(res.message || "Failed to update permission");
            }

            setShowEdit(false);
            setSelectedItem(null);
        } catch (err) {
            console.error("Edit Error:", err);
            alert("Failed to update permission");
        }
    };

    // DELETE
    const handleDelete = async () => {
        if (!selectedItem) return;

        try {
            const res = await deletePermission(selectedItem.id, org_id);

            if (res.success) {
                alert("Permission deleted!");
                setRefresh((v) => !v);
            } else {
                alert(res.message || "Failed to delete permission");
            }

            setShowDelete(false);
            setSelectedItem(null);
        } catch (err) {
            console.error("Delete Error:", err);
            alert("Failed to delete permission");
        }
    };

    const columns = [
        { key: "sno", label: "S.No" },
        { key: "name", label: "Name" },
        { key: "no_of_permission", label: "Total Permission" },
        { key: "timezone_type", label: "Date / Time" },
        { key: "config_label", label: "Monthly / Yearly" },
        { key: "actions", label: "Actions" },
    ];

    const renderActions = (row: any) => (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600"
                onClick={() => {
                    setSelectedItem(row);
                    setShowEdit(true);
                }}
            >
                <Edit className="w-4 h-4" />
            </Button>

            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 text-red-600 border-red-600"
                onClick={() => {
                    setSelectedItem(row);
                    setShowDelete(true);
                }}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Permission List</h2>

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

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Permissions</h2>

                        <button
                            onClick={() => setShowAdd(true)}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                        >
                            <ArrowBigDownDash size={18} /> Add Permission
                        </button>
                    </div>

                    {/* MODALS */}
                    <PermissionAddModal
                        isOpen={showAdd}
                        onClose={() => setShowAdd(false)}
                        onSubmit={handleAdd}
                    />

                    <PermissionEditModal
                        isOpen={showEdit}
                        onClose={() => setShowEdit(false)}
                        onSubmit={handleEdit}
                        initialData={{
                            permission_name: selectedItem?.name || "",
                            no_permission: selectedItem?.no_of_permission || "",
                            time_zone: selectedItem?.timezone_type || "Date",
                            config_type: selectedItem?.config_type?.toString() || "1",
                        }}
                    />

                    <DeleteModal
                        isOpen={showDelete}
                        onClose={() => setShowDelete(false)}
                        onConfirm={handleDelete}
                        title="Delete Permission"
                        message={`Are you sure you want to delete "${selectedItem?.name || ""}"?`}
                        itemName={selectedItem?.name || ""}
                    />

                    <TableComponent
                        tableId="permission-table-details"
                        columns={columns}
                        data={permissionData.map((d, index) => ({
                            ...d,
                            sno: (page - 1) * itemsPerPage + (index + 1),
                            actions: renderActions(d),
                        }))}
                        currentPage={page}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        totalCount={totalCount}
                        onPageChange={setPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />

                    {/* <div className="flex justify-between text-sm text-gray-500 px-2 mt-2">
                        <span>Previous Page: {prevPage ?? "None"}</span>
                        <span>Next Page: {nextPage ?? "None"}</span>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default PermissionList;
