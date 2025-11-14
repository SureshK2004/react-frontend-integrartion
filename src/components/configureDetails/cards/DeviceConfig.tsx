import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, Edit, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import AddModal from "./AddModal";
import { PiDeviceMobileCamera } from "react-icons/pi";

const DeviceConfiguration: React.FC = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAdd = (data: any) => {
        const newDevice = {
            id: deviceData.length + 1,
            deviceId: data.deviceId,
            deviceName: data.deviceName,
            deviceType: data.deviceType,
            deviceLocation: data.deviceLocation,
        };
        console.log("✅ New Device Config Added:", newDevice);
        setDeviceData([...deviceData, newDevice]);
    };

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // ✅ Dummy Device Data
    const [deviceData, setDeviceData] = useState([
        {
            id: 1,
            deviceId: "DEV001",
            deviceName: "Attendance Scanner 1",
            deviceType: "Fixed",
            deviceLocation: "Main Office",
        },
        {
            id: 2,
            deviceId: "DEV002",
            deviceName: "Portable Tracker A1",
            deviceType: "Portable",
            deviceLocation: "Warehouse",
        },
        {
            id: 3,
            deviceId: "DEV003",
            deviceName: "Visitor Scanner",
            deviceType: "Fixed",
            deviceLocation: "Reception",
        },
    ]);

    const totalPages = Math.ceil(deviceData.length / itemsPerPage);

    const columns = [
        { key: "id", label: "S.No" },
        { key: "deviceId", label: "Device ID" },
        { key: "deviceName", label: "Device Name" },
        { key: "deviceType", label: "Device Type" },
        { key: "deviceLocation", label: "Device Location" },
        { key: "actions", label: "Actions" },
    ];

    const renderActions = (row: any) => (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600"
                onClick={() => console.log("Edit", row.id)}
            >
                <Edit className="w-4 h-4" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 text-red-600 border-red-600"
                onClick={() => console.log("Delete", row.id)}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
            <div className="max-w-7xl mx-auto">
                {/* ✅ Header */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Device Configuration
                        </h2>
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

                {/* ✅ Table Section */}
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Device List
                        </h2>

                        <div className="flex items-center justify-end gap-3">

                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <PiDeviceMobileCamera size={18} />
                                Add Device
                            </button>

                            {/* ✅ Add Device Modal */}
                            <AddModal
                                title="Add Device Configuration"
                                isOpen={showAddModal}
                                onClose={() => setShowAddModal(false)}
                                onSubmit={handleAdd}
                                fields={[
                                    { label: "Device ID", key: "deviceId", placeholder: "Enter device ID" },
                                    { label: "Device Name", key: "deviceName", placeholder: "Enter device name" },
                                    {
                                        label: "Device Type",
                                        key: "deviceType",
                                        type: "select",
                                        options: ["Portable", "Fixed"],
                                    },
                                    {
                                        label: "Device Location",
                                        key: "deviceLocation",
                                        placeholder: "Enter device location",
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    {/* ✅ Table */}
                    <TableComponent
                        tableId="device-config-table"
                        columns={columns}
                        data={deviceData.map((d) => ({
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

export default DeviceConfiguration;
