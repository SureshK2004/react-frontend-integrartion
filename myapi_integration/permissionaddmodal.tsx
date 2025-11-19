
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
    onSubmit: (data: any) => void;
}

const PermissionAddModal: React.FC<AddPermissionModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        permission_name: "",
        time_zone: "",
        config_type: "",
        no_permission: "",
    });

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
        setFormData({
            permission_name: "",
            time_zone: "",
            config_type: "",
            no_permission: "",
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-[#111827] text-white border border-gray-700 rounded-xl">
                <DialogHeader>
                    <DialogTitle>Add Permission</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">

                    {/* Permission Name */}
                    <div>
                        <Label className="text-gray-300">Permission Name</Label>
                        <Input
                            placeholder="Enter Permission Name"
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
                            <option value="">Select Time Zone</option>
                            <option value="Time">Time</option>
                            <option value="Date">Date</option>
                        </select>
                    </div>

                    {/* Config Type */}
                    <div>
                        <Label className="text-gray-300">
                            Config Type (1 = Monthly, 2 = Yearly)
                        </Label>
                        <select
                            value={formData.config_type}
                            onChange={(e) => handleChange("config_type", e.target.value)}
                            className="w-full h-11 bg-gray-800 text-white px-3 rounded-lg border border-gray-700"
                        >
                            <option value="">Select Config Type</option>
                            <option value="1">Monthly</option>
                            <option value="2">Yearly</option>
                        </select>
                    </div>

                    {/* No of Permissions */}
                    <div>
                        <Label className="text-gray-300">Number of Permissions</Label>
                        <Input
                            type="number"
                            placeholder="0"
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
                        Close
                    </Button>
                    <Button className="bg-primary text-white" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PermissionAddModal;
