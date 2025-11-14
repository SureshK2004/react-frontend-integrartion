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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomField {
    id: string;
    fieldName: string;
    customization: "assignee" | "assigner";
    required: boolean;
    fieldType: "text" | "select" | "file" | "number" | "date" | "textarea" | "search";
    options?: string[];
}

interface CustomFieldModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddField: (field: CustomField) => void;
}

const CustomFieldModal: React.FC<CustomFieldModalProps> = ({
    isOpen,
    onClose,
    onAddField,
}) => {
    const [taskType, setTaskType] = useState<string>("");
    const [enableCSAT, setEnableCSAT] = useState<boolean>(true);
    const [csatMandatory, setCsatMandatory] = useState<boolean>(false);
    const [fieldName, setFieldName] = useState<string>("");
    const [customization, setCustomization] = useState<"assignee" | "assigner">("assignee");
    const [required, setRequired] = useState<boolean>(false);
    const [fieldType, setFieldType] = useState<"text" | "select" | "file" | "number" | "date" | "textarea" | "search">("search");
    const [options, setOptions] = useState<string[]>([""]);
    const [addedFields, setAddedFields] = useState<CustomField[]>([]);
    const [selectedCSATForm, setSelectedCSATForm] = useState<string>("");

    const fieldTypes = [
        { value: "text", label: "Text Box" },
        { value: "number", label: "Number" },
        { value: "select", label: "Drop Down" },
        { value: "textarea", label: "Text Area" },
        { value: "date", label: "Date" },
        { value: "file", label: "Upload File" },
        { value: "search", label: "Search Type" }
    ];

    const customizationOptions = [
        { value: "assignee", label: "Assignee" },
        { value: "assigner", label: "Assigner" }
    ];

    const csatFormOptions = [
        { value: "", label: "Select the Forms" },
        { value: "form1", label: "Customer Satisfaction Form" },
        { value: "form2", label: "Service Quality Form" },
        { value: "form3", label: "Product Feedback Form" }
    ];

    const handleAddOption = () => {
        setOptions([...options, ""]);
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleRemoveOption = (index: number) => {
        if (options.length > 1) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleAddCustomField = () => {
        if (!fieldName.trim()) {
            alert("Please enter field name");
            return;
        }

        const newField: CustomField = {
            id: Date.now().toString(),
            fieldName: fieldName.trim(),
            customization,
            required,
            fieldType,
            options: fieldType === "select" ? options.filter(opt => opt.trim() !== "") : undefined
        };

        setAddedFields([...addedFields, newField]);
        onAddField(newField);
        
        // Reset form
        setFieldName("");
        setCustomization("assignee");
        setRequired(false);
        setFieldType("search");
        setOptions([""]);
    };

    const handleRemoveAddedField = (id: string) => {
        setAddedFields(addedFields.filter(field => field.id !== id));
    };

    // Helper function to get display label
    const getDisplayLabel = (value: string, options: { value: string; label: string }[]) => {
        return options.find(option => option.value === value)?.label || value;
    };

    // Render field preview based on field type
    const renderFieldPreview = (field: CustomField) => {
        switch (field.fieldType) {
            case "text":
                return (
                    <Input 
                        type="text" 
                        placeholder={`Enter ${field.fieldName}`}
                        className="w-full h-10"
                    />
                );
            case "number":
                return (
                    <Input 
                        type="number" 
                        placeholder={`Enter ${field.fieldName}`}
                        className="w-full h-10"
                    />
                );
            case "textarea":
                return (
                    <textarea 
                        placeholder={`Enter ${field.fieldName}`}
                        className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                );
            case "date":
                return (
                    <Input 
                        type="date" 
                        className="w-full h-10"
                    />
                );
            case "select":
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="outline" 
                                className="w-full h-10 justify-between bg-white border-gray-300"
                            >
                                Select an option
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
                            {field.options?.map((option, index) => (
                                <DropdownMenuItem key={index} value={option}>
                                    {option}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            case "search":
                return (
                    <div className="relative">
                        <Input 
                            type="text" 
                            placeholder={`Search ${field.fieldName}`}
                            className="w-full h-10 pr-10"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                );
            case "file":
                return (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                        <div className="text-gray-500 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                        <Input type="file" className="hidden" id={`file-upload-${field.id}`} />
                        <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => document.getElementById(`file-upload-${field.id}`)?.click()}
                        >
                            Select File
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-5xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        Task Type
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col md:flex-row h-[calc(90vh-180px)] overflow-hidden">
                    {/* Left Side - Form Configuration */}
                    <div className="w-full md:w-1/2 p-6 overflow-y-auto">
                        <div className="space-y-6">
                            {/* Task Type */}
                            <div className="space-y-3">
                                <Label className="text-gray-800 dark:text-gray-200 font-medium">
                                    Task Type *
                                </Label>
                                <Input
                                    placeholder="Enter task type"
                                    value={taskType}
                                    onChange={(e) => setTaskType(e.target.value)}
                                    className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary rounded-xl"
                                />
                            </div>

                            {/* Enable CSAT Form */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Label className="text-gray-800 dark:text-gray-200 font-medium">
                                    Enable CSAT Form
                                </Label>
                                <Switch
                                    checked={enableCSAT}
                                    onCheckedChange={setEnableCSAT}
                                />
                            </div>

                            {/* CSAT Configuration - Conditionally Rendered */}
                            {enableCSAT && (
                                <div className="space-y-4">
                                    {/* CSAT Form Selection */}
                                    <div className="space-y-3">
                                        <Label className="text-gray-800 dark:text-gray-200 font-medium">
                                            Select CSAT Form *
                                        </Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button 
                                                    variant="outline" 
                                                    className="w-full h-11 justify-between bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                                                >
                                                    {getDisplayLabel(selectedCSATForm, csatFormOptions)}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
                                                {csatFormOptions.map((option) => (
                                                    <DropdownMenuItem 
                                                        key={option.value}
                                                        onClick={() => setSelectedCSATForm(option.value)}
                                                        className="cursor-pointer"
                                                    >
                                                        {option.label}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* CSAT Mandatory */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <Label className="text-gray-800 dark:text-gray-200 font-medium">
                                            CSAT Mandatory
                                        </Label>
                                        <Switch
                                            checked={csatMandatory}
                                            onCheckedChange={setCsatMandatory}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Field Configuration */}
                            <div className="space-y-4">
                                {/* Field Name */}
                                <div className="space-y-2">
                                    <Label className="text-gray-800 dark:text-gray-200 font-medium">
                                        Enter Field Name *
                                    </Label>
                                    <Input
                                        placeholder=" Enter field name"
                                        value={fieldName}
                                        onChange={(e) => setFieldName(e.target.value)}
                                        className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary rounded-xl"
                                    />
                                </div>

                                {/* Customization */}
                                <div className="space-y-2">
                                    <Label className="text-gray-800 dark:text-gray-200 font-medium">
                                        Customization *
                                    </Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button 
                                                variant="outline" 
                                                className="w-full h-11 justify-between bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                                            >
                                                {getDisplayLabel(customization, customizationOptions)}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
                                            {customizationOptions.map((option) => (
                                                <DropdownMenuItem 
                                                    key={option.value}
                                                    onClick={() => setCustomization(option.value as "assignee" | "assigner")}
                                                    className="cursor-pointer"
                                                >
                                                    {option.label}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* Required */}
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <Label className="text-gray-800 dark:text-gray-200 font-medium">
                                        Required
                                    </Label>
                                    <Switch
                                        checked={required}
                                        onCheckedChange={setRequired}
                                    />
                                </div>

                                {/* Field Type */}
                                <div className="space-y-2">
                                    <Label className="text-gray-800 dark:text-gray-200 font-medium">
                                        Field Type *
                                    </Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button 
                                                variant="outline" 
                                                className="w-full h-11 justify-between bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                                            >
                                                {getDisplayLabel(fieldType, fieldTypes)}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
                                            {fieldTypes.map((type) => (
                                                <DropdownMenuItem 
                                                    key={type.value}
                                                    onClick={() => {
                                                        const newType = type.value as typeof fieldType;
                                                        setFieldType(newType);
                                                        if (newType !== "select") {
                                                            setOptions([""]);
                                                        }
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                    {type.label}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            {/* Options for Select Field Type */}
                            {fieldType === "select" && (
                                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <Label className="text-gray-800 dark:text-gray-200 font-medium">
                                        Dropdown Options
                                    </Label>
                                    <div className="space-y-2">
                                        {options.map((option, index) => (
                                            <div key={index} className="flex gap-2">
                                                <Input
                                                    placeholder={`Option ${index + 1}`}
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    className="flex-1 h-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary rounded-xl"
                                                />
                                                {options.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleRemoveOption(index)}
                                                        className="h-10 px-3 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleAddOption}
                                        className="mt-2 border-dashed border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        + Add Option
                                    </Button>
                                </div>
                            )}

                            {/* Add Field Button */}
                            <div className="flex justify-center">
                                <Button
                                    onClick={handleAddCustomField}
                                    className="px-6 py-3 text-base font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-xl"
                                >
                                    Add Field
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Field Preview */}
                    <div className="w-full md:w-1/2 p-6 bg-blue-50 dark:bg-gray-800 overflow-y-auto">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Field Preview</h3>
                            
                            {addedFields.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No fields added yet</p>
                                    <p className="text-sm mt-2">Add fields using the form on the left</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {addedFields.map((field) => (
                                        <Card key={field.id} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {field.fieldName}
                                                        </span>
                                                        {field.required && <span className="text-red-500">*</span>}
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveAddedField(field.id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 h-auto"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </Button>
                                                </div>
                                                
                                                <div className="mb-3 flex gap-2 flex-wrap">
                                                    <Badge variant="secondary" className="capitalize">
                                                        {field.customization}
                                                    </Badge>
                                                    <Badge variant={field.required ? "default" : "outline"}>
                                                        {field.required ? "Required" : "Optional"}
                                                    </Badge>
                                                    <Badge variant="outline" className="capitalize">
                                                        {fieldTypes.find(ft => ft.value === field.fieldType)?.label}
                                                    </Badge>
                                                </div>
                                                
                                                <div className="mt-4">
                                                    {renderFieldPreview(field)}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex justify-end gap-3 p-6 pt-0">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium bg-red-100 border-red-300 text-red-700 hover:bg-red-200 rounded-lg"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CustomFieldModal;