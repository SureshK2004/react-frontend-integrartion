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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Field {
    label: string;
    key: string;
    type?:
        | "text"
        | "number"
        | "select"
        | "radio"
        | "checkbox"
        | "textarea"
        | "date"
        | "datetime"
        | "file"
        | "switch";
    placeholder?: string;
    options?: string[];
    multiple?: boolean;
    defaultValue?: any;   // ✅ add this
  disabled?: boolean;
}

interface PopupModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    fields: Field[];
}

const PopupModal: React.FC<PopupModalProps> = ({
    title,
    isOpen,
    onClose,
    onSubmit,
    fields,
}) => {
    const [formData, setFormData] = useState<any>({});

    const handleChange = (key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData({});
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    {fields.map((field) => (
                        <div key={field.key} className="flex flex-col space-y-2">
                            <Label
                                htmlFor={field.key}
                                className="text-gray-800 dark:text-gray-200 font-medium"
                            >
                                {field.label}
                            </Label>

                            {(() => {
                                switch (field.type) {
                                    case "select":
                                        return (
                                            <select
                                                id={field.key}
                                                value={formData[field.key] || ""}
                                                onChange={(e) =>
                                                    handleChange(field.key, e.target.value)
                                                }
                                                className="h-11 px-3 text-base bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                            >
                                                <option value="" disabled>
                                                    Select {field.label}
                                                </option>
                                                {field.options?.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        );

                                    case "radio":
                                        return (
                                            <div className="flex items-center gap-4 mt-1 flex-wrap">
                                                {field.options?.map((opt) => (
                                                    <label
                                                        key={opt}
                                                        className="flex items-center gap-2 text-gray-800 dark:text-gray-200 cursor-pointer"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={field.key}
                                                            value={opt}
                                                            checked={formData[field.key] === opt}
                                                            onChange={() =>
                                                                handleChange(field.key, opt)
                                                            }
                                                            className="text-primary focus:ring-primary"
                                                        />
                                                        <span>{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        );

                                    case "checkbox":
                                        return (
                                            <div className="flex items-center gap-4 mt-1 flex-wrap">
                                                {field.options?.map((opt) => (
                                                    <label
                                                        key={opt}
                                                        className="flex items-center gap-2 text-gray-800 dark:text-gray-200 cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={opt}
                                                            checked={
                                                                formData[field.key]?.includes(opt) ||
                                                                false
                                                            }
                                                            onChange={(e) => {
                                                                const checked = e.target.checked;
                                                                const prev =
                                                                    formData[field.key] || [];
                                                                handleChange(
                                                                    field.key,
                                                                    checked
                                                                        ? [...prev, opt]
                                                                        : prev.filter(
                                                                              (x: string) => x !== opt
                                                                          )
                                                                );
                                                            }}
                                                            className="text-primary focus:ring-primary"
                                                        />
                                                        <span>{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        );

                                    case "textarea":
                                        return (
                                            <Textarea
                                                id={field.key}
                                                placeholder={
                                                    field.placeholder ||
                                                    `Enter ${field.label}`
                                                }
                                                value={formData[field.key] || ""}
                                                onChange={(e) =>
                                                    handleChange(field.key, e.target.value)
                                                }
                                                className="h-24 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary rounded-xl"
                                            />
                                        );

                                    case "date":
                                        return (
                                            <Input
                                                id={field.key}
                                                type="date"
                                                value={formData[field.key] || ""}
                                                onChange={(e) =>
                                                    handleChange(field.key, e.target.value)
                                                }
                                                className="h-11 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary rounded-xl"
                                            />
                                        );

                                    case "datetime":
                                        return (
                                            <Input
                                                id={field.key}
                                                type="datetime-local"
                                                value={formData[field.key] || ""}
                                                onChange={(e) =>
                                                    handleChange(field.key, e.target.value)
                                                }
                                                className="h-11 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary rounded-xl"
                                            />
                                        );

                                    case "file":
                                        return (
                                            <Input
                                                id={field.key}
                                                type="file"
                                                multiple={field.multiple}
                                                onChange={(e) => {
                                                    const files = e.target.files;
                                                    handleChange(
                                                        field.key,
                                                        field.multiple ? files : files?.[0]
                                                    );
                                                }}
                                                className="h-11 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary rounded-xl"
                                            />
                                        );

                                    case "switch":
                                        return (
                                            <div className="flex items-center gap-3 mt-2">
                                                <Switch
                                                    id={field.key}
                                                    checked={!!formData[field.key]}
                                                    onCheckedChange={(val) =>
                                                        handleChange(field.key, val)
                                                    }
                                                />
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {formData[field.key] ? "Enabled" : "Disabled"}
                                                </span>
                                            </div>
                                        );

                                    default:
                                        return (
                                            <Input
                                                id={field.key}
                                                type={field.type || "text"}
                                                placeholder={
                                                    field.placeholder ||
                                                    `Enter ${field.label}`
                                                }
                                                value={formData[field.key] || ""}
                                                onChange={(e) =>
                                                    handleChange(field.key, e.target.value)
                                                }
                                                className="h-11 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary rounded-xl"
                                            />
                                        );
                                }
                            })()}
                        </div>
                    ))}
                </div>

                <DialogFooter className="flex justify-end gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded-lg"
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PopupModal;
