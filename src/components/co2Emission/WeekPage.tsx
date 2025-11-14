import React from 'react';

const WeekPage: React.FC = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Weekly CO₂ Emission
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Weekly CO₂ emission data will be displayed here. (Placeholder for weekly data visualization)
      </p>
    </div>
  );
};

export default WeekPage;