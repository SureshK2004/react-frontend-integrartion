import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

import {
    getZones,
    createZone,
    updateZone,
    deleteZone,
} from "@/api/zoneApi";


const Zone: React.FC = () => {
    const navigate = useNavigate();

 
    const [page, setPage] = useState(1);                
    const [itemsPerPage, setItemsPerPage] = useState(5); 
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

  
    const [zoneData, setZoneData] = useState<any[]>([]);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [selectedItem, setSelectedItem] = useState<any>(null);

    const org_id = 3;

    const fetchZones = async () => {
        try {
            const res = await getZones(org_id, page, itemsPerPage);

            setZoneData(res.data || []);
            setTotalCount(res.total_count || 0);
            setTotalPages(Math.ceil((res.total_count || 0) / itemsPerPage));
        } catch (err) {
            console.error("Error fetching zone list:", err);
        }
    };

    useEffect(() => {
        fetchZones();
    }, [page, itemsPerPage]);

    const handleAdd = async (data: any) => {
        await createZone({
            zone_name: data.zoneName,
            org_id,
        });
        setShowAdd(false);
        setPage(1);       
        fetchZones();
    };

   
    const handleEdit = async (data: any) => {
        await updateZone({
            id: selectedItem.zone_id,
            zone_name: data.zoneName,
            org_id,
        });
        setShowEdit(false);
        fetchZones();
    };

    const handleDelete = async () => {
        await deleteZone(selectedItem.zone_id, org_id);
        setShowDelete(false);
        fetchZones();
    };

    const columns = [
        { key: "sno", label: "S.No" },
        { key: "zone_name", label: "Zone Name" },
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

              
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
                    <div className="flex items-center justify-between">

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Zone List
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

                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Zones
                        </h2>

                        <button
                            onClick={() => setShowAdd(true)}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                        >
                            <ArrowBigDownDash size={18} /> Add Zone
                        </button>
                    </div>

                    <AddModal
                        title="Add Zone"
                        isOpen={showAdd}
                        onClose={() => setShowAdd(false)}
                        onSubmit={handleAdd}
                        fields={[{ label: "Zone Name", key: "zoneName" }]}
                    />

                    {/* EDIT */}
                    <EditModal
                        title="Edit Zone"
                        isOpen={showEdit}
                        onClose={() => setShowEdit(false)}
                        onSubmit={handleEdit}
                        fields={[{ label: "Zone Name", key: "zoneName" }]}
                        initialData={{ zoneName: selectedItem?.zone_name || "" }}
                    />

                    {/* DELETE */}
                    <DeleteModal
                        isOpen={showDelete}
                        onClose={() => setShowDelete(false)}
                        onConfirm={handleDelete}
                        title="Delete Zone"
                        message="Are you sure you want to delete this zone?"
                        itemName={selectedItem?.zone_name}
                    />

                    {/* TABLE */}
                    <TableComponent
                        tableId="zone-table-details"
                        columns={columns}
                        data={zoneData.map((d, idx) => ({
                            ...d,
                            sno: (page - 1) * itemsPerPage + (idx + 1),
                            actions: renderActions(d),
                        }))}

                        currentPage={page}
                        totalPages={totalPages}
                        totalCount={totalCount}
                        itemsPerPage={itemsPerPage}

                        onPageChange={(p) => setPage(p)}

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

export default Zone;
