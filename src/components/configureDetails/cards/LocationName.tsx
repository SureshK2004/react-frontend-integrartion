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
    getLocationNames,
    createLocationName,
    updateLocationName,
    deleteLocationName,
} from "@/api/locationNameApi";

const LocationName: React.FC = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [locationData, setLocationData] = useState<any[]>([]);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [selectedItem, setSelectedItem] = useState<any>(null);

    const org_id = 3;

    const fetchLocations = async () => {
        try {
            const res = await getLocationNames(org_id);

            const list = res.locations || [];

           
            setTotalCount(list.length);

            
            setTotalPages(Math.ceil(list.length / itemsPerPage));

        
            const paginated = list.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
            );

            setLocationData(paginated);
        } catch (err) {
            console.error("Error fetching location list:", err);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, [page, itemsPerPage]);

    const handleAdd = async (data: any) => {
        await createLocationName({
            org_id,
            location_name: data.location,
        });

        setShowAdd(false);
        setPage(1); 
        fetchLocations();
    };

    const handleEdit = async (data: any) => {
        await updateLocationName({
            id: selectedItem.id,
            org_id,
            name: data.location,
        });

        setShowEdit(false);
        fetchLocations();
    };

    const handleDelete = async () => {
        await deleteLocationName(selectedItem.id, org_id);
        setShowDelete(false);
        fetchLocations();
    };

    const columns = [
        { key: "sno", label: "S.No" },
        { key: "name", label: "Location Name" },
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

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Locations List
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

                {/* Table Card */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border">

                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Locations
                        </h2>

                        <button
                            onClick={() => setShowAdd(true)}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                        >
                            <ArrowBigDownDash size={18} /> Add Location
                        </button>
                    </div>

                    {/* ADD */}
                    <AddModal
                        title="Add Location"
                        isOpen={showAdd}
                        onClose={() => setShowAdd(false)}
                        onSubmit={handleAdd}
                        fields={[{ label: "Location Name", key: "location" }]}
                    />

                    {/* EDIT */}
                    <EditModal
                        title="Edit Location"
                        isOpen={showEdit}
                        onClose={() => setShowEdit(false)}
                        onSubmit={handleEdit}
                        fields={[{ label: "Location Name", key: "location" }]}
                        initialData={{ location: selectedItem?.name || "" }}
                    />

                    {/* DELETE */}
                    <DeleteModal
                        isOpen={showDelete}
                        onClose={() => setShowDelete(false)}
                        onConfirm={handleDelete}
                        title="Delete Location"
                        message="Are you sure you want to delete this location?"
                        itemName={selectedItem?.name}
                    />

                    {/* TABLE */}
                    <TableComponent
                        tableId="location-table-details"
                        columns={columns}
                        data={locationData.map((d, idx) => ({
                            ...d,
                            sno: (page - 1) * itemsPerPage + (idx + 1),
                            actions: renderActions(d),
                        }))}

                        currentPage={page}
                        totalPages={totalPages}
                        totalCount={totalCount}
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

export default LocationName;
