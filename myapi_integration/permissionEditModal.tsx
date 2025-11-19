import React, { useEffect, useState } from "react";
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

interface EditPermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData: any;
}

const PermissionEditModal: React.FC<EditPermissionModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] = useState<any>(initialData);

    useEffect(() => {
        if (isOpen) setFormData(initialData);
    }, [isOpen, initialData]);

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-[#111827] text-white border border-gray-700 rounded-xl">
                <DialogHeader>
                    <DialogTitle>Edit Permission</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    {/* Permission Name */}
                    <div>
                        <Label className="text-gray-300">Permission Name</Label>
                        <Input
                            value={formData.permission_name}
                            onChange={(e) =>
                                handleChange("permission_name", e.target.value)
                            }
                            className="bg-gray-800 text-white border-gray-700"
                        />
                    </div>

                    {/* Time Zone */}
                    <div>
                        <Label className="text-gray-300">Time Zone</Label>
                        <select
                            value={formData.time_zone}
                            onChange={(e) => handleChange("time_zone", e.target.value)}
                            className="w-full h-11 bg-gray-800 text-white px-3 rounded-lg border border-gray-700"
                        >
                            <option value="Time">Time</option>
                            <option value="Date">Date</option>
                        </select>
                    </div>

                    {/* Config Type */}
                    <div>
                        <Label className="text-gray-300">Config Type</Label>
                        <select
                            value={formData.config_type}
                            onChange={(e) => handleChange("config_type", e.target.value)}
                            className="w-full h-11 bg-gray-800 text-white px-3 rounded-lg border border-gray-700"
                        >
                            <option value="1">Monthly</option>
                            <option value="2">Yearly</option>
                        </select>
                    </div>

                    {/* Number of Permissions */}
                    <div>
                        <Label className="text-gray-300">Number of Permissions</Label>
                        <Input
                            type="number"
                            value={formData.no_permission}
                            onChange={(e) =>
                                handleChange("no_permission", e.target.value)
                            }
                            className="bg-gray-800 text-white border-gray-700"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        className="border-gray-500 text-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button className="bg-primary text-white" onClick={handleSubmit}>
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PermissionEditModal;
