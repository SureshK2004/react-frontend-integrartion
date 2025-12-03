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

interface Field {
  label: string;
  key: string;
  type?: "text" | "number" | "textarea";
  placeholder?: string;
}

interface EditModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  fields: Field[];
  initialData?: any;
}

const EditModal: React.FC<EditModalProps> = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  fields,
  initialData = {},
}) => {
  const [formData, setFormData] = useState<any>(initialData);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [isOpen, initialData]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();            
  };

  const handleClose = () => {
    setFormData(initialData); 
    onClose();                
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl">
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

              {field.type === "textarea" ? (
                <textarea
                  id={field.key}
                  placeholder={field.placeholder || `Enter ${field.label}`}
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="h-24 px-3 py-2 text-base bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                />
              ) : (
                <Input
                  id={field.key}
                  type={field.type || "text"}
                  placeholder={field.placeholder || `Enter ${field.label}`}
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="h-11 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary rounded-xl"
                />
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded-lg"
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
