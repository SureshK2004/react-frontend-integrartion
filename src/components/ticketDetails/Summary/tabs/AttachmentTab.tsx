import React from "react";
import { Paperclip } from "lucide-react";

interface Attachment {
  id: number;
  name: string;
  type: "image" | "pdf" | "doc";
  url: string;
}

const mockAttachments: Attachment[] = [
  { id: 1, name: "error_screenshot.png", type: "image", url: "#" },
  { id: 2, name: "report.pdf", type: "pdf", url: "#" },
];

const AttachmentTab: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Paperclip className="w-5 h-5" /> Attachments
      </h3>

      {mockAttachments.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No attachments available.</p>
      ) : (
        <ul className="space-y-3">
          {mockAttachments.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <span className="text-sm">{file.name}</span>
              <a
                href={file.url}
                className="text-primary hover:underline text-sm font-medium"
                target="_blank"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttachmentTab;
