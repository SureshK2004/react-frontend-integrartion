// components/formsDetails/ViewForms.tsx
import React from "react";
import { CalendarDays } from "lucide-react";

const sampleForms = [
  {
    id: "1",
    title: "Employee Feedback",
    description: "Monthly feedback form",
    createdAt: "2025-10-20",
    questions: [
      { label: "Employee Name", type: "short-answer", extra: "Alien X" },
      { label: "Email", type: "email", extra: "AlienX@gmail.com" },
      { label: "Department", type: "dropdown", options: ["UI UX", "Frontend", "Backend"] },
      { label: "Training Rating", type: "rating" },
      { label: "Upload File", type: "file-upload" },
    ],
  },
  {
    id: "2",
    title: "Project Survey",
    description: "Project retrospective survey",
    createdAt: "2025-10-18",
    questions: [
      { label: "Project Name", type: "short-answer" },
      { label: "Team Members", type: "checkbox", options: ["Alice", "Bob", "Charlie"] },
      { label: "Completion Date", type: "date" },
      { label: "Comments", type: "paragraph" },
    ],
  },
  {
    id: "3",
    title: "Project Survey",
    description: "Project retrospective survey",
    createdAt: "2025-10-18",
    questions: [
      { label: "Project Name", type: "short-answer" },
      { label: "Team Members", type: "checkbox", options: ["Alice", "Bob", "Charlie"] },
      { label: "Completion Date", type: "date" },
      { label: "Comments", type: "paragraph" },
    ],
  },
  {
    id: "4",
    title: "Project Survey",
    description: "Project retrospective survey",
    createdAt: "2025-10-18",
    questions: [
      { label: "Project Name", type: "short-answer" },
      { label: "Team Members", type: "checkbox", options: ["Alice", "Bob", "Charlie"] },
      { label: "Completion Date", type: "date" },
      { label: "Comments", type: "paragraph" },
    ],
  },
  {
    id: "5",
    title: "Project Survey",
    description: "Project retrospective survey",
    createdAt: "2025-10-18",
    questions: [
      { label: "Project Name", type: "short-answer" },
      { label: "Team Members", type: "checkbox", options: ["Alice", "Bob", "Charlie"] },
      { label: "Completion Date", type: "date" },
      { label: "Comments", type: "paragraph" },
    ],
  },
  {
    id: "3",
    title: "Project Survey",
    description: "Project retrospective survey",
    createdAt: "2025-10-18",
    questions: [
      { label: "Project Name", type: "short-answer" },
      { label: "Team Members", type: "checkbox", options: ["Alice", "Bob", "Charlie"] },
      { label: "Completion Date", type: "date" },
      { label: "Comments", type: "paragraph" },
    ],
  },
  {
    id: "4",
    title: "Project Survey",
    description: "Project retrospective survey",
    createdAt: "2025-10-18",
    questions: [
      { label: "Project Name", type: "short-answer" },
      { label: "Team Members", type: "checkbox", options: ["Alice", "Bob", "Charlie"] },
      { label: "Completion Date", type: "date" },
      { label: "Comments", type: "paragraph" },
    ],
  },
  {
    id: "5",
    title: "Project Survey",
    description: "Project retrospective survey",
    createdAt: "2025-10-18",
    questions: [
      { label: "Project Name", type: "short-answer" },
      { label: "Team Members", type: "checkbox", options: ["Alice", "Bob", "Charlie"] },
      { label: "Completion Date", type: "date" },
      { label: "Comments", type: "paragraph" },
    ],
  },
  {
    id: "3",
    title: "Project Survey",
    description: "Project retrospective survey",
    createdAt: "2025-10-18",
    questions: [
      { label: "Project Name", type: "short-answer" },
      { label: "Team Members", type: "checkbox", options: ["Alice", "Bob", "Charlie"] },
      { label: "Completion Date", type: "date" },
      { label: "Comments", type: "paragraph" },
    ],
  },
  {
    id: "4",
    title: "Project Survey",
    description: "Project retrospective survey",
    createdAt: "2025-10-18",
    questions: [
      { label: "Project Name", type: "short-answer" },
      { label: "Team Members", type: "checkbox", options: ["Alice", "Bob", "Charlie"] },
      { label: "Completion Date", type: "date" },
      { label: "Comments", type: "paragraph" },
    ],
  },
  {
    id: "5",
    title: "Project Survey",
    description: "Project retrospective survey",
    createdAt: "2025-10-18",
    questions: [
      { label: "Project Name", type: "short-answer" },
      { label: "Team Members", type: "checkbox", options: ["Alice", "Bob", "Charlie"] },
      { label: "Completion Date", type: "date" },
      { label: "Comments", type: "paragraph" },
    ],
  },
];

const ViewForms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Saved Forms
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {sampleForms.map((form) => (
          <div
            key={form.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {form.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {form.description}
            </p>

            {/* Created Date */}
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <CalendarDays className="w-4 h-4 mr-2" />
              Created on {new Date(form.createdAt).toLocaleDateString("en-GB")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewForms;
