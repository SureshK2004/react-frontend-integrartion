import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

interface CustomField {
    id: string;
    fieldName: string;
    customization: "assignee" | "assigner";
    required: boolean;
    fieldType: "text" | "select" | "file" | "number" | "date" | "textarea" | "search";
    options?: string[];
}

interface TaskTypeData {
    id: number;
    taskType: string;
    customField: string;
    fields?: CustomField[];
}

interface ViewCustomFieldsModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskType: TaskTypeData | null;
    onDeleteField: (taskTypeId: number, fieldId: string) => void;
}

const ViewCustomFieldsModal: React.FC<ViewCustomFieldsModalProps> = ({
    isOpen,
    onClose,
    taskType,
    onDeleteField,
}) => {
    const fieldTypes = [
        { value: "text", label: "Text Box" },
        { value: "number", label: "Number" },
        { value: "select", label: "Drop Down" },
        { value: "textarea", label: "Text Area" },
        { value: "date", label: "Date" },
        { value: "file", label: "Upload File" },
        { value: "search", label: "Search Type" }
    ];

    const getFieldTypeLabel = (fieldType: string) => {
        return fieldTypes.find(type => type.value === fieldType)?.label || fieldType;
    };

    const handleDeleteField = (fieldId: string) => {
        if (taskType && window.confirm("Are you sure you want to delete this field?")) {
            onDeleteField(taskType.id, fieldId);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-4xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        Custom Fields - {taskType?.taskType}
                    </DialogTitle>
                </DialogHeader>

                <div className="overflow-y-auto max-h-[60vh]">
                    {!taskType?.fields || taskType.fields.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-gray-400 mb-4">
                                <Plus size={48} className="mx-auto opacity-50" />
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                                No Custom Fields Added
                            </p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm">
                                Add custom fields to this task type to see them here
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {taskType.fields.map((field) => (
                                <Card 
                                    key={field.id} 
                                    className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-gray-900 dark:text-white text-lg">
                                                    {field.fieldName}
                                                </span>
                                                {field.required && (
                                                    <Badge variant="destructive" className="text-xs">
                                                        Required
                                                    </Badge>
                                                )}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteField(field.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 h-auto rounded-full"
                                                title="Delete Field"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <Badge 
                                                variant="secondary" 
                                                className="capitalize bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                            >
                                                {field.customization}
                                            </Badge>
                                            <Badge 
                                                variant="outline"
                                                className="capitalize border-green-200 text-green-800 dark:border-green-800 dark:text-green-300"
                                            >
                                                {getFieldTypeLabel(field.fieldType)}
                                            </Badge>
                                            {field.fieldType === "select" && field.options && (
                                                <Badge 
                                                    variant="outline"
                                                    className="text-purple-800 dark:text-purple-300"
                                                >
                                                    {field.options.length} options
                                                </Badge>
                                            )}
                                        </div>
                                        
                                        {/* Show options for select field type */}
                                        {field.fieldType === "select" && field.options && field.options.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Options:
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {field.options.map((option, index) => (
                                                        <Badge 
                                                            key={index} 
                                                            variant="outline"
                                                            className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                                        >
                                                            {option}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <DialogFooter className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-6 py-2 text-sm font-medium border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ViewCustomFieldsModal;