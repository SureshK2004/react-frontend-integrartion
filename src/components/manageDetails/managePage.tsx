// components/manageDetail/managePage.tsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ManageLayout from './manageLayout';
import CreateUserPage from "./createUser";
import { ListChecks, MonitorDot, Plus, UserRoundCheck, UserRoundPlus, UsersRound } from "lucide-react";

const ManagePage: React.FC = () => {
  const navigate = useNavigate();
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const cards = [
       {
      title: "Create User",
      description: "Quickly add a new user to the system.",
      iconColor: "bg-green-500",
      icon: <UserRoundPlus className="w-6 h-6" />,
      route: "/manage/create-user",
      isModal: true
    },
    {
      title: "User List",
      description: "All your roles in one users, Edit or add more users.",
      iconColor: "bg-purple-500",
      icon: <UsersRound className="w-6 h-6" />,
      route: "/manage/user-list",
      isModal: false
    },
    {
      title: "Onboarding Form",
      description: "All your department in one place. Onboard, edit or add users easily.",
      iconColor: "bg-blue-500",
      icon: <Plus className="w-6 h-6" />,
      route: "/onboarding-form",
      isModal: false
    },
    {
      title: "Re-Assign User",
      description: "All your designation in one place. Assign or unassign more users.",
      iconColor: "bg-red-500",
      icon: <UserRoundCheck className="w-6 h-6" />,
      route: "/manage/reassign-user",
      isModal: false
    },
    {
      title: "All Approval",
      description: "All your approval in one page, Attendance, leave and expense.",
      iconColor: "bg-teal-500",
      icon: <ListChecks className="w-6 h-6" />,
      route: "/manage/all-approval",
      isModal: false
    },
    {
      title: "Active / Inactive",
      description: "User can change active or inactive status.",
      iconColor: "bg-[#708DEB]",
      icon: <MonitorDot className="w-6 h-6" />,
      route: "/manage/active-inactive",
      isModal: false
    },
  ];

  const handleCardClick = (card: any) => {
    if (card.isModal) {
      setIsCreateUserModalOpen(true);
    } else {
      navigate(card.route);
    }
  };

  return (
    <>
      <ManageLayout showBackButton={false}>
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
      </ManageLayout>

      {/* Create User Modal */}
      <CreateUserPage 
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
      />
    </>
  );
};

export default ManagePage;