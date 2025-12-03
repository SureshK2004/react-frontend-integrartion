import React from "react";
import { ThemeToggle } from "../theme-toggle";

const CrmSmmaryHead: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between m-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            CRM Summary Details
          </h2>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default CrmSmmaryHead;