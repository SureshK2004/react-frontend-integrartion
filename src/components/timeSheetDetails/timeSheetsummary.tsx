import React from 'react';

const TimeSheetSummary: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Time Sheet Summary
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
          <span>Total Hours Worked</span>
          <span className="font-semibold">160 hrs</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
          <span>Regular Hours</span>
          <span className="font-semibold">140 hrs</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
          <span>Overtime Hours</span>
          <span className="font-semibold">20 hrs</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
          <span>Projects Completed</span>
          <span className="font-semibold">8</span>
        </div>
        {/* Add more summary content here */}
      </div>
    </div>
  );
};

export default TimeSheetSummary;