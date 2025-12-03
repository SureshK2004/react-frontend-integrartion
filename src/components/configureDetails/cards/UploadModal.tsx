import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ title = "Upload File", isOpen, onClose, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        {/* File Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Excel File</label>
          <input
            type="file"
            accept=".xlsx,.xls"
            className="block w-full text-sm text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 
                       file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray/10 
                       file:text-primary cursor-pointer"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />

          {selectedFile && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Selected: <span className="font-medium">{selectedFile.name}</span>
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
          >
            Cancel
          </Button>
          <Button
            disabled={!selectedFile}
            onClick={() => {
              if (selectedFile) {
                onSubmit(selectedFile);
                onClose();
              }
            }}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
