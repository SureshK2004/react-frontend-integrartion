import React from "react";

interface QueryTabProps {
  subject: string;
  query: string;
}

const QueryTab: React.FC<QueryTabProps> = ({ subject, query }) => {
  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Subject</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">{subject}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Query</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {query}
        </p>
      </div>
    </div>
  );
};

export default QueryTab;
