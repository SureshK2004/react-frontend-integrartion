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

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    org_id: number;
}

const AddLeaveModal: React.FC<Props> = ({
    isOpen,
    onClose,
    onSubmit,
    org_id,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        no_of_leave: "",
        leave_config_type: "Yearly",
        monthly_split: false,
        leave_carry_forward: false,
        carry_forward_limit: "",
    });

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const payload = {
            ...formData,
            carry_forward_limit: formData.leave_carry_forward
                ? formData.carry_forward_limit
                : 0,
            org_id,
        };

        onSubmit(payload);

        setFormData({
            name: "",
            no_of_leave: "",
            leave_config_type: "Yearly",
            monthly_split: false,
            leave_carry_forward: false,
            carry_forward_limit: "",
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg bg-white dark:bg-[#111827] rounded-xl">

                <DialogHeader>
                    <DialogTitle>Add Leave</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">

                    
                    <div>
                        <Label>Leave Name</Label>
                        <Input
                            placeholder="Enter Leave Name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Number of Leave</Label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={formData.no_of_leave}
                                onChange={(e) =>
                                    handleChange("no_of_leave", e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Yearly / Monthly</Label>
                            <select
                                value={formData.leave_config_type}
                                onChange={(e) =>
                                    handleChange("leave_config_type", e.target.value)
                                }
                                className="w-full h-11 px-3 rounded-lg bg-gray-50 dark:bg-gray-800 border dark:border-gray-700"
                            >
                                <option>Yearly</option>
                                <option>Monthly</option>
                            </select>
                        </div>
                    </div>

                    
                    <div className="flex items-center gap-6">
                        <Label className="min-w-[120px]">Monthly Split</Label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="monthly_split"
                                checked={formData.monthly_split === true}
                                onChange={() => handleChange("monthly_split", true)}
                            />
                            Yes
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="monthly_split"
                                checked={formData.monthly_split === false}
                                onChange={() => {
                                    handleChange("monthly_split", false);
                                    handleChange("leave_carry_forward", false);
                                    handleChange("carry_forward_limit", "");
                                }}
                            />
                            No
                        </label>
                    </div>

                    
                    {formData.monthly_split && (
                        <div className="flex items-center gap-6">
                            <Label className="min-w-[140px]">Leave Carry Forward</Label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="leave_carry_forward"
                                    checked={formData.leave_carry_forward === true}
                                    onChange={() =>
                                        handleChange("leave_carry_forward", true)
                                    }
                                />
                                Yes
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="leave_carry_forward"
                                    checked={formData.leave_carry_forward === false}
                                    onChange={() => {
                                        handleChange("leave_carry_forward", false);
                                        handleChange("carry_forward_limit", "");
                                    }}
                                />
                                No
                            </label>
                        </div>
                    )}

                   
                    {formData.monthly_split && formData.leave_carry_forward && (
                        <div>
                            <Label>Carry Forward Limit</Label>
                            <Input
                                type="number"
                                placeholder="Enter Carry Forward Limit"
                                value={formData.carry_forward_limit}
                                onChange={(e) =>
                                    handleChange("carry_forward_limit", e.target.value)
                                }
                            />
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
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

export default AddLeaveModal;
