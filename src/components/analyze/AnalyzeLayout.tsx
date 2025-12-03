// components/analyzeDetail/analyzeLayout.tsx
import React from 'react';
import AnalyzeHeader from './AnayzeHeader';
import { useLocation } from 'react-router-dom';

interface AnalyzeLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

const AnalyzeLayout: React.FC<AnalyzeLayoutProps> = ({ 
  children, 
  showBackButton 
}) => {
  const location = useLocation();
  
  // Don't show back button on the main analyze page
  const isMainPage = location.pathname === '/analyze';
  const shouldShowBackButton = showBackButton !== undefined ? showBackButton : !isMainPage;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Common Header with conditional back button */}
        <AnalyzeHeader showBackButton={shouldShowBackButton} />
        
        {/* Page-specific content */}
        {children}
      </div>
    </div>
  );
};

export default AnalyzeLayout;