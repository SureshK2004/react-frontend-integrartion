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

import { getLocations, getEntities } from "@/api/projectlistApi";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    org_id: number;
}

const ProjectAddModal: React.FC<Props> = ({
    isOpen,
    onClose,
    onSubmit,
    org_id
}) => {
    const [formData, setFormData] = useState({
        project_name: "",
        location: "",
        entity: "",
    });

    const [locations, setLocations] = useState<any[]>([]);
    const [entities, setEntities] = useState<any[]>([]);

    useEffect(() => {
        if (isOpen) {
            loadDropdowns();
        }
    }, [isOpen]);

    const loadDropdowns = async () => {
        const loc = await getLocations(org_id);
        const ent = await getEntities(org_id);
        setLocations(loc);
        setEntities(ent);
    };

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData({ project_name: "", location: "", entity: "" });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-[#111827] border dark:border-gray-700 rounded-xl">

                <DialogHeader>
                    <DialogTitle>Add Project</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-3">

                    {/* Project Name */}
                    <div>
                        <Label>Project Name</Label>
                        <Input
                            value={formData.project_name}
                            onChange={(e) => handleChange("project_name", e.target.value)}
                        />
                    </div>

                    {/* Location Dropdown */}
                    <div>
                        <Label>Location</Label>
                        <select
                            value={formData.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            className="w-full h-11 bg-gray-50 dark:bg-gray-800 px-3 rounded-lg border dark:border-gray-700"
                        >
                            <option value="">Select Location</option>
                            {locations.map((loc) => (
                                <option key={loc.id} value={loc.id}>
                                    {loc.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Entity Dropdown */}
                    <div>
                        <Label>Entity</Label>
                        <select
                            value={formData.entity}
                            onChange={(e) => handleChange("entity", e.target.value)}
                            className="w-full h-11 bg-gray-50 dark:bg-gray-800 px-3 rounded-lg border dark:border-gray-700"
                        >
                            <option value="">Select Entity</option>
                            {entities.map((ent) => (
                                <option key={ent.id} value={ent.id}>
                                    {ent.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    <Button onClick={handleSubmit} className="bg-primary text-white">
                        Submit
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
};

export default ProjectAddModal;
