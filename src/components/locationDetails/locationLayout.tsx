// components/locationDetail/locationLayout.tsx
import React from 'react';
import LocationHead from './locationHead';
import { useLocation } from 'react-router-dom';

interface LocationLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

const LocationLayout: React.FC<LocationLayoutProps> = ({ 
  children, 
  showBackButton 
}) => {
  const location = useLocation();
  
  // Don't show back button on the main location page
  const isMainPage = location.pathname === '/';
  const shouldShowBackButton = showBackButton !== undefined ? showBackButton : !isMainPage;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Common Header with conditional back button */}
        <LocationHead showBackButton={shouldShowBackButton} />
        
        {/* Page-specific content */}
        {children}
      </div>
    </div>
  );
};

export default LocationLayout;