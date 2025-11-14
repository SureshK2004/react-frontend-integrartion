// components/manageDetail/subPages/CreateUserPage.tsx
import React from 'react';
import ManageLayout from './manageLayout';


const ActiveInactivePage: React.FC = () => {
  return (
    <ManageLayout>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-4">Active Inactive Page</h1>
        <p>Active Inactive will go here...</p>
      </div>
    </ManageLayout>
  );
};

export default ActiveInactivePage;