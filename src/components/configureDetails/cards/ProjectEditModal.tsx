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
    initialData: any;
    org_id: number;
}

const ProjectEditModal: React.FC<Props> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
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
            setFormData({
                project_name: initialData?.project_name || "",
                location: initialData?.location_id || "",
                entity: initialData?.entity_id || "",
            });
            loadDropdowns();
        }
    }, [isOpen, initialData]);

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
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-[#111827] border dark:border-gray-700 rounded-xl">

                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-3">

                    <div>
                        <Label>Project Name</Label>
                        <Input
                            value={formData.project_name}
                            onChange={(e) => handleChange("project_name", e.target.value)}
                        />
                    </div>

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
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} className="bg-primary text-white">
                        Update
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
};

export default ProjectEditModal;
