// components/analyzeDetail/analyzeHeader.tsx
import React from "react";
import { ThemeToggle } from "../theme-toggle";
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AnalyzeHeaderProps {
  showBackButton?: boolean;
  pageTitle?: string; // Add optional pageTitle prop
}

const AnalyzeHeader: React.FC<AnalyzeHeaderProps> = ({ 
  showBackButton = true, 
  pageTitle // Accept custom page title
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define page titles based on routes - updated with actual routes from AnalyzeHome
  const getPageTitle = () => {
    if (pageTitle) return pageTitle; // Use custom title if provided
    
    switch (location.pathname) {
      case '/analyze/reports':
        return 'Reports';
      case '/analyze/daily-report':
        return 'Daily Report';
      case '/analyze/attendance-report':
        return 'Attendance Report';
      case '/analyze/rba-violation':
        return 'RBA Violation Details';
      case '/analyze/tracking-time':
        return 'Tracking Time Report';
      case '/analyze/overtime-report':
        return 'Overtime Report';
      case '/analyze': // Main analyze page
      default:
        return 'Analysis Overview';
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between m-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getPageTitle()}
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          {/* Back Button - Only show when not on main page */}
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default AnalyzeHeader;