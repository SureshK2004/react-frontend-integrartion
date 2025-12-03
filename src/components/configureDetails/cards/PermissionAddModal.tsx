import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddPermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        permission_name: string;
        time_zone: string;
        config_type: string;
        no_permission: string | number;
    }) => void;
    title?: string;
}

const PermissionAddModal: React.FC<AddPermissionModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title = "Add Permission",
}) => {
    const [formData, setFormData] = useState({
        permission_name: "",
        time_zone: "Time",
        config_type: "1",
        no_permission: "",
    });

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        // Basic validation
        if (!formData.permission_name?.trim()) {
            alert("Permission name is required");
            return;
        }
        if (!formData.no_permission) {
            alert("Number of permissions is required");
            return;
        }

        onSubmit({
            permission_name: formData.permission_name,
            time_zone: formData.time_zone,
            config_type: formData.config_type,
            no_permission: formData.no_permission,
        });

        // reset & close handled by parent ideally, but we'll reset local state:
        setFormData({
            permission_name: "",
            time_zone: "Time",
            config_type: "1",
            no_permission: "",
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md 
    bg-white dark:bg-[#111827] 
    text-gray-900 dark:text-white 
    border border-gray-300 dark:border-gray-700 
    rounded-xl">

                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">

                    <div>
                        <Label className="text-gray-700 dark:text-gray-300">Permission Name</Label>
                        <Input
                            placeholder="Enter Permission Name"
                            value={formData.permission_name}
                            onChange={(e) => handleChange("permission_name", e.target.value)}
                            className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                        />
                    </div>

                    <div>
                        <Label className="text-gray-700 dark:text-gray-300">Time Zone</Label>
                        <select
                            value={formData.time_zone}
                            onChange={(e) => handleChange("time_zone", e.target.value)}
                            className="w-full h-11 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 rounded-lg border border-gray-300 dark:border-gray-700"
                        >
                            <option value="Time">Time</option>
                            <option value="Date">Date</option>
                        </select>
                    </div>

                    <div>
                        <Label className="text-gray-700 dark:text-gray-300">Config Type</Label>
                        <select
                            value={formData.config_type}
                            onChange={(e) => handleChange("config_type", e.target.value)}
                            className="w-full h-11 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 rounded-lg border border-gray-300 dark:border-gray-700"
                        >
                            <option value="1">Monthly</option>
                            <option value="2">Yearly</option>
                        </select>
                    </div>

                    <div>
                        <Label className="text-gray-700 dark:text-gray-300">Number of Permissions</Label>
                        <Input
                            type="number"
                            placeholder="0"
                            value={formData.no_permission}
                            onChange={(e) => handleChange("no_permission", e.target.value)}
                            className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        className="border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300"
                        onClick={onClose}
                    >
                        Close
                    </Button>

                    <Button
                        className="bg-primary text-white"
                        onClick={() => {
                            handleSubmit();
                            onClose();
                        }}
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
};

export default PermissionAddModal;