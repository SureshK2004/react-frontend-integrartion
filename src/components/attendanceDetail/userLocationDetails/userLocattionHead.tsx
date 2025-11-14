import React from "react";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface UserLocationHeadProps {
      userName: string;
  onBack: () => void;
}

const UserLocationHead: React.FC<UserLocationHeadProps> = ({ onBack }) => {
  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between m-3">
        {/* Left Side - Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Location
        </h2>

        {/* Right Side - Back Button + Theme Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default UserLocationHead;
