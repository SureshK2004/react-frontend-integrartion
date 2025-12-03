// components/formsDetails/UploadLogo.tsx
import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "../ui/button";

interface UploadLogoProps {
  onPreviewChange?: (url: string) => void;
}

const UploadLogo: React.FC<UploadLogoProps> = ({ onPreviewChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(""); // reset preview until upload
    }
  };

  const handleUpload = () => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    if (onPreviewChange) onPreviewChange(previewUrl); // 👈 send preview to parent
  };

  return (
    <div className="space-y-4">
      <label className="block text-gray-700 dark:text-gray-300 font-medium">
        Upload Logo
      </label>

      <div className="relative flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-primary transition-colors duration-200">
        <UploadCloud className="w-10 h-10 text-primary dark:text-white mb-2" />
        <span className="text-gray-500 dark:text-gray-300 text-sm">
          Drag & drop file here or click to browse
        </span>

        {file && (
          <span className="text-gray-700 dark:text-gray-200 text-sm mt-2">
            Selected file: {file.name}
          </span>
        )}

        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-lg"
          onChange={handleFileChange}
        />
      </div>

      <Button
        onClick={handleUpload}
        disabled={!file}
        className="bg-primary text-white hover:bg-blue-600 w-max mt-2 disabled:opacity-50"
      >
        Upload
      </Button>

      {preview && (
        <div className="mt-4">
          <p className="text-gray-700 dark:text-gray-200 mb-2">Preview:</p>
          <img
            src={preview}
            alt="Uploaded Preview"
            className="w-48 h-48 object-contain border rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default UploadLogo;
