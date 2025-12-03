import React from "react";
import {
  Users,
  Building2,
  Briefcase,
  LogIn,
  Clock,
  Calendar,
  MapPin,
  GitBranch,
  Target,
  ClipboardList,
  Map,
  Navigation,
  Heart,
  Cpu,
  ListChecks,
  Shield,
  CreditCard,
  Settings,
  UsersRound,
  Building,
  Sliders,
  FileCheck,
  CheckSquare,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../theme-toggle";

const LearnPage: React.FC = () => {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Roles",
      description: "All your roles in one place, Edit or add more roles.",
      iconColor: "bg-blue-500",
      icon: <Users className="w-6 h-6" />,
      path: '/config/roles'
    },
    {
      title: "Department",
      description:
        "All your separtment in one place, Edit or add more departments.",
      iconColor: "bg-green-500",
      icon: <Building2 className="w-6 h-6" />,
      path: '/config/departments'
    },
    {
      title: "Designation",
      description:
        "All your designations in one place, Edit or add more designations.",
      iconColor: "bg-purple-500",
      icon: <Briefcase className="w-6 h-6" />,
      path: '/config/designation'
    },
    {
      title: "Entry",
      description: "All your entities in one place, Edit or add more entities.",
      iconColor: "bg-orange-500",
      icon: <LogIn className="w-6 h-6" />,
      path: '/config/entry'
    },
    {
      title: "Shift time",
      description:
        "All your shift time in one place, Edit or add more shift time .",
      iconColor: "bg-yellow-500",
      icon: <Clock className="w-6 h-6" />,
      path: '/config/shifttime'
    },
    {
      title: "Holiday calendar",
      description:
        "All your holiday calendars in one place, Edit or add more holiday calendars.",
      iconColor: "bg-red-500",
      icon: <Calendar className="w-6 h-6" />,
      path: '/config/holidays'
    },
    {
      title: "Zones list",
      description:
        "All your zones list  in one place, Edit or add more zones list.",
      iconColor: "bg-teal-500",
      icon: <MapPin className="w-6 h-6" />,
      path: '/config/zones'
    },
    {
      title: "Branch list",
      description:
        "All your branch list in one place, Edit or add more brsnch list.",
      iconColor: "bg-indigo-500",
      icon: <GitBranch className="w-6 h-6" />,
      path: '/config/branch-list'
    },
    {
      title: "Project",
      description: "All your projects in one place, Edit or add more projects.",
      iconColor: "bg-pink-500",
      icon: <Target className="w-6 h-6" />,
      path: '/config/project-list'
    },
    {
      title: "Time sheet task",
      description:
        "All your time sheet task in one place, Edit or add more time sheet task.",
      iconColor: "bg-amber-500",
      icon: <ClipboardList className="w-6 h-6" />,
      path: '/config/task-detials'
    },
    {
      title: "Map location",
      description:
        "All your map locations in one place, Edit or add more map locations.",
      iconColor: "bg-emerald-500",
      icon: <Map className="w-6 h-6" />,
      path: "/geo-fencing",
    },
    {
      title: "Location name",
      description:
        "All your locations in one place, Edit or add more location name.",
      iconColor: "bg-cyan-500",
      icon: <Navigation className="w-6 h-6" />,
      path: '/config/location-name'
    },
    {
      title: "Relationship",
      description:
        "All your relationship in one place, Edit or add more relationship.",
      iconColor: "bg-rose-500",
      icon: <Heart className="w-6 h-6" />,
      path: '/config/relationship'
    },
    {
      title: "Device configuration",
      description:
        "All your device configuration in one place, Edit or add more device configuration.",
      iconColor: "bg-gray-500",
      icon: <Cpu className="w-6 h-6" />,
      path:'/config/device_configuration'
    },
    {
      title: "Leave list",
      description:
        "All your leave list in one place, Edit or add more leave list.",
      iconColor: "bg-lime-500",
      icon: <ListChecks className="w-6 h-6" />,
      path: '/config/leave_list'
    },
    {
      title: "Permission list",
      description:
        "All your permission list in one place, Edit or add more permission lists.",
      iconColor: "bg-violet-500",
      icon: <Shield className="w-6 h-6" />,
      path:'/config/permission_list'
    },
    {
      title: "Expense list",
      description:
        "All your expense lists in one place, Edit or add more expense lists.",
      iconColor: "bg-amber-600",
      icon: <CreditCard className="w-6 h-6" />,
      path:'/config/expense_list'
    },
    {
      title: "Master drop-down",
      description:
        "All your master-drop-drop in one place, Edit or add more master-drop-down.",
      iconColor: "bg-sky-500",
      icon: <Settings className="w-6 h-6" />,
      path:'/config/master_dropdown'
    },
    {
      title: "Teams",
      description: "All your teams in one place, Edit or add more teams.",
      iconColor: "bg-orange-600",
      icon: <UsersRound className="w-6 h-6" />,
      path:'/config/add_teams'
    },
    {
      title: "Client & site",
      description:
        "All your client & site in one place, Edit or add more client & sites.",
      iconColor: "bg-purple-600",
      icon: <Building className="w-6 h-6" />,
    },
    {
      title: "Master config",
      description:
        "All your master config  in one place, Edit or add more master config.",
      iconColor: "bg-green-600",
      icon: <Sliders className="w-6 h-6" />,
    },
    {
      title: "SLA",
      description: "All your SLA in one place, Edit or add more SLAs.",
      iconColor: "bg-blue-600",
      icon: <FileCheck className="w-6 h-6" />,
      path:'/config/sla_configure'
    },
    {
      title: "Task type",
      description:
        "All your task type in one place, Edit or add more task types.",
      iconColor: "bg-red-600",
      icon: <CheckSquare className="w-6 h-6" />,
      path:'/config/task_type'
    },
    {
      title: "Custom fields",
      description:
        "All your custom fields in one place, Edit or add more custom fields.",
      iconColor: "bg-teal-600",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: "Shift Roster",
      description:
        "All your custom fields in one place, Edit or add more custom fields.",
      iconColor: "bg-teal-600",
      icon: <FileText className="w-6 h-6" />,
      path:'/config/shift_roster'
    },
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between m-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Learn & Configure
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Explore and manage all system configurations in one place
              </p>
            </div>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl hover:border-primary border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 active:translate-y-0 p-4 sm:p-6"
              onClick={() => handleCardClick(card.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(card.path);
                }
              }}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${card.iconColor} flex items-center justify-center`}
                >
                  <div className="text-white">{card.icon}</div>
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
      </div>
    </div>
  );
};

export default LearnPage;
