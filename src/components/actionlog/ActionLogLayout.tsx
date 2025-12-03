import React from 'react';
import ActionLogHeader from './ActionLogHeader';
import { useLocation } from 'react-router-dom';

interface ActionLogLayoutProps {
  children?: React.ReactNode; 
  showBackButton?: boolean;
}

const ActionLogLayout: React.FC<ActionLogLayoutProps> = ({ 
  children, 
  showBackButton 
}) => {
  const location = useLocation();
  
  
  const isMainPage = location.pathname === '/action-log';
  const shouldShowBackButton = showBackButton !== undefined ? showBackButton : !isMainPage;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Common Header with conditional back button */}
        <ActionLogHeader showBackButton={shouldShowBackButton} />
        
        {/* Page-specific content - render children if provided */}
        {children || (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-gray-500 dark:text-gray-400">No content provided</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionLogLayout;