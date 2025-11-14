// components/analyzeHome.tsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import AnalyzeLayout from './AnalyzeLayout';
import { 
  FileText, 
  Calendar, 
  UserCheck, 
  AlertTriangle, 
  Clock, 
  TrendingUp 
} from "lucide-react";

const AnalyzeHome: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Reports",
      description: "All users attendance details in one place.",
      iconColor: "bg-blue-500",
      icon: <FileText className="w-6 h-6" />,
      route: "/analyze/reports"
    },
    {
      title: "Daily Report",
      description: "All users attendance, total hours, break hours, and performed hours.",
      iconColor: "bg-green-500",
      icon: <Calendar className="w-6 h-6" />,
      route: "/analyze/daily-report"
    },
    {
      title: "Attendance Report",
      description: "All users daily attendance with shift time, total hours and OT hours.",
      iconColor: "bg-purple-500",
      icon: <UserCheck className="w-6 h-6" />,
      route: "/analyze/attendance-report"
    },
    {
      title: "RBA Violation Details",
      description: "All users RBA violation details in one place.",
      iconColor: "bg-red-500",
      icon: <AlertTriangle className="w-6 h-6" />,
      route: "/analyze/rba-violation"
    },
    {
      title: "Tracking Time Report",
      description: "All users tracking time detail in one place.",
      iconColor: "bg-orange-500",
      icon: <Clock className="w-6 h-6" />,
      route: "/analyze/tracking-time"
    },
    {
      title: "Overtime Report",
      description: "All users tracking overtime detail in one place.",
      iconColor: "bg-teal-500",
      icon: <TrendingUp className="w-6 h-6" />,
      route: "/analyze/overtime-report"
    }
  ];

  const handleCardClick = (card: any) => {
    navigate(card.route);
  };

  return (
    <AnalyzeLayout showBackButton={false}>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 p-4 sm:p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400"
             >
            <div className="flex items-start space-x-3 sm:space-x-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${card.iconColor} flex items-center justify-center`}>
                <div className="text-white">
                  {card.icon}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnalyzeLayout>
  );
};

export default AnalyzeHome;