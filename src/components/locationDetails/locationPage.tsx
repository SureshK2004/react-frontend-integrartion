// components/locationDetail/locationPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocationLayout from './locationLayout';
import { FaLocationArrow } from 'react-icons/fa';
import { LocateFixedIcon, LocateIcon, Plus } from 'lucide-react';

const LocationPage: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Assign Location",
      description: "All user locations in one place. Edit or assign more users easily.",
      iconColor: "bg-green-500",
      icon: <FaLocationArrow className="w-6 h-6" />,
      route: "/assign-location"
    },
    {
      title: "Live Tracking",
      description: "All your live tracking details in one live tracking.",
      iconColor: "bg-purple-500",
      icon: <LocateIcon className="w-6 h-6" />,
      route: "/live-tracking"
    },
    {
      title: "Assign Details",
      description: "All user location details in one place. View users' location easily.",
      iconColor: "bg-blue-500",
      icon: <Plus className="w-6 h-6" />,
      route: "/assign-details"
    },
    {
      title: "Trip and Live Tracking",
      description: "All user locations in one place. Edit or assign more users easily.",
      iconColor: "bg-red-500",
      icon: <LocateFixedIcon className="w-6 h-6" />,
      route: "/trip-tracking"
    },
  ];

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <LocationLayout showBackButton={false}>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.route)}
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
    </LocationLayout>
  );
};

export default LocationPage;