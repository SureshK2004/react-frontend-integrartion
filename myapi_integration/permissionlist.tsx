import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import PermissionAddModal from "./PermissionAddModal";
import PermissionEditModal from "./PermissionEditModal";
import DeleteModal from "./DeleteModal";

import {
    getPermissions,
    createPermission,
    updatePermission,
    deletePermission,
} from "@/api/permissionlistApi";

const PermissionList: React.FC = () => {
    const navigate = useNavigate();

    const [permissionData, setPermissionData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [selectedItem, setSelectedItem] = useState<any>(null);

    const org_id = 3;

    // ------------------------
    // FETCH PERMISSION LIST
    // ------------------------
    const fetchPermissions = async () => {
        try {
            const res = await getPermissions(org_id);
            const list = res.data || res.results || [];

            const paginated = list.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
            );

            setPermissionData(paginated);
        } catch (err) {
            console.error("Error fetching permissions:", err);
        }
    };

    useEffect(() => {
        fetchPermissions();
    }, [page, itemsPerPage]);

    // ------------------------
    // ADD NEW PERMISSION
    // ------------------------
    const handleAdd = async (data: any) => {
        await createPermission({
            permission_name: data.permission_name,
            no_permission: data.no_permission,
            config_type: data.config_type, // 1 or 2
            time_zone: data.time_zone,     // Time / Date
            org_id: org_id,
        });

        setShowAdd(false);
        setPage(1);
        fetchPermissions();
    };

    // ------------------------
    // EDIT PERMISSION
    // ------------------------
    const handleEdit = async (data: any) => {
        await updatePermission({
            id: selectedItem.id,
            name: data.permission_name,
            no_of_permission: data.no_permission,
            config_type: data.config_type,
            time_zone: data.time_zone,
            org_id: org_id,
        });

        setShowEdit(false);
        fetchPermissions();
    };

    // ------------------------
    // DELETE PERMISSION
    // ------------------------
    const handleDelete = async () => {
        await deletePermission(selectedItem.id, org_id);
        setShowDelete(false);
        fetchPermissions();
    };

    // ------------------------
    // TABLE COLUMNS
    // ------------------------
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

                {/* HEADER */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Permission List
                        </h2>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                            >
                                <ArrowLeft size={18} />
                                Back
                            </button>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                {/* TABLE SECTION */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border">

                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Permissions
                        </h2>

                        <button
                            onClick={() => setShowAdd(true)}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                        >
                            <ArrowBigDownDash size={18} /> Add Permission
                        </button>
                    </div>

                    {/* ADD MODAL */}
                    <PermissionAddModal
                        title="Add Permission"
                        isOpen={showAdd}
                        onClose={() => setShowAdd(false)}
                        onSubmit={handleAdd}
                        fields={[
                            {
                                label: "Permission Name",
                                key: "permission_name",
                                type: "text",
                            },
                            {
                                label: "Time Zone",
                                key: "time_zone",
                                type: "select",
                                options: [
                                    { label: "Time", value: "Time" },
                                    { label: "Date", value: "Date" },
                                ],
                            },
                            {
                                label: "Config Type",
                                key: "config_type",
                                type: "select",
                                options: [
                                    { label: "Monthly", value: "1" },
                                    { label: "Yearly", value: "2" },
                                ],
                            },
                            {
                                label: "Number of Permissions",
                                key: "no_permission",
                                type: "number",
                            },
                        ]}
                    />

                    {/* EDIT MODAL */}
                    <PermissionEditModal
                        title="Edit Permission"
                        isOpen={showEdit}
                        onClose={() => setShowEdit(false)}
                        onSubmit={handleEdit}
                        fields={[
                            { label: "Permission Name", key: "permission_name" },
                            { label: "Number of Permissions", key: "no_permission" },
                            {
                                label: "Time Zone",
                                key: "time_zone",
                                type: "select",
                                options: [
                                    { label: "Time", value: "Time" },
                                    { label: "Date", value: "Date" },
                                ],
                            },
                            {
                                label: "Config Type",
                                key: "config_type",
                                type: "select",
                                options: [
                                    { label: "Monthly", value: "1" },
                                    { label: "Yearly", value: "2" },
                                ],
                            },
                        ]}
                        initialData={{
                            permission_name: selectedItem?.name || "",
                            no_permission: selectedItem?.no_of_permission || "",
                            time_zone: selectedItem?.timezone_type || "Time",
                            config_type: selectedItem?.config_type?.toString() || "1",
                        }}
                    />

                    {/* DELETE MODAL */}
                    <DeleteModal
                        isOpen={showDelete}
                        onClose={() => setShowDelete(false)}
                        onConfirm={handleDelete}
                        title="Delete Permission"
                        message="Are you sure you want to delete this permission?"
                        itemName={selectedItem?.name}
                    />

                    {/* TABLE */}
                    <TableComponent
                        tableId="permission-table-details"
                        columns={columns}
                        data={permissionData.map((d, i) => ({
                            ...d,
                            sno: (page - 1) * itemsPerPage + (i + 1),
                            actions: renderActions(d),
                        }))}
                        currentPage={page}
                        totalPages={Math.ceil(15 / itemsPerPage)}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setPage}
                        onItemsPerPageChange={(limit) => {
                            setItemsPerPage(limit);
                            setPage(1);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PermissionList;
