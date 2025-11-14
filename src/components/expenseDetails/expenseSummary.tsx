// components/expenseSummary.tsx
import React from 'react';

const ExpenseSummary: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Summary View
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
          <span>Food & Dining</span>
          <span className="font-semibold">$1,200.00</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
          <span>Transportation</span>
          <span className="font-semibold">$800.00</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
          <span>Entertainment</span>
          <span className="font-semibold">$450.00</span>
        </div>
        {/* Add more summary content here */}
      </div>
    </div>
  );
};

export default ExpenseSummary;