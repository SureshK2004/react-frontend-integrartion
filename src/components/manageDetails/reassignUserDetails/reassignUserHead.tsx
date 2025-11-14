// components/locationDetail/reassignUserHead.tsx
import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ReassignUserHeadProps {
  // Props can be removed or kept for future use
}

const ReassignUserHead: React.FC<ReassignUserHeadProps> = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reassign User
          </h2>
        </div>
        
        {/* Back Button and Theme Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default ReassignUserHead;