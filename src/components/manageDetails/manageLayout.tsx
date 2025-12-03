// components/manageDetail/manageLayout.tsx
import React from 'react';
import ManageHead from './manageHead';
import { useLocation } from 'react-router-dom';

interface ManageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

const ManageLayout: React.FC<ManageLayoutProps> = ({ 
  children, 
  showBackButton 
}) => {
  const location = useLocation();
  
  // Don't show back button on the main manage page
  const isMainPage = location.pathname === '/manage';
  const shouldShowBackButton = showBackButton !== undefined ? showBackButton : !isMainPage;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Common Header with conditional back button */}
        <ManageHead showBackButton={shouldShowBackButton} />
        
        {/* Page-specific content */}
        {children}
      </div>
    </div>
  );
};

export default ManageLayout;