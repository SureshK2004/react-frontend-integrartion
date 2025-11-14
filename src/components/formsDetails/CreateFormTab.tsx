import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateFormTab: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Main Card */}
      <div className="bg-white dark:bg-gray-800 px-6 py-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Header: Create Forms + Icon */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Forms
          </h2>
          <Plus className="w-5 h-5 text-primary dark:text-white cursor-pointer"
            onClick={() => navigate("/forms/new")}
          /> {/* same primary color */}
        </div>

        {/* Action: Create New button */}
        <button className="bg-primary  text-white font-medium py-2 px-4 rounded-lg shadow-md"
          onClick={() => navigate("/forms/new")}
        >
          Create New
        </button>
      </div>

      {/* Optional: More form cards can go here */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> ... </div> */}
    </div>
  );
};

export default CreateFormTab;
