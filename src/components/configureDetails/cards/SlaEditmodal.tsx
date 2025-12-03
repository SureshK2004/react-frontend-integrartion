import React, { useState, useEffect } from "react";
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

interface SLAEditModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

const SLAEditModal: React.FC<SLAEditModalProps> = ({
    title,
    isOpen,
    onClose,
    onSubmit,
    initialData = {},
}) => {
    const [formData, setFormData] = useState<any>(initialData);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData);
        }
    }, [isOpen, initialData]);

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-2xl shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">

                    {/* Priority */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-gray-800 dark:text-gray-200">Priority</Label>
                        <select
                            className="h-11 px-3 bg-gray-50 dark:bg-gray-800 border rounded-xl"
                            value={formData.priority || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, priority: e.target.value })
                            }
                        >
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    {/* Resolution Time */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-gray-800 dark:text-gray-200">Resolution Time</Label>
                        <Input
                            type="number"
                            className="h-11 bg-gray-50 dark:bg-gray-800 border rounded-xl"
                            value={formData.resolutionTime || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, resolutionTime: e.target.value })
                            }
                            placeholder="Enter time (e.g., 4)"
                        />
                    </div>

                    {/* Resolution Unit */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-gray-800 dark:text-gray-200">Resolution Unit</Label>
                        <select
                            className="h-11 px-3 bg-gray-50 dark:bg-gray-800 border rounded-xl"
                            value={formData.resolutionUnit || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, resolutionUnit: e.target.value })
                            }
                        >
                            <option value="">Select Resolution Unit</option>
                            <option value="Hours">Hours</option>
                            <option value="Days">Days</option>
                        </select>
                    </div>
                </div>

                <DialogFooter className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="bg-primary text-white">
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SLAEditModal;