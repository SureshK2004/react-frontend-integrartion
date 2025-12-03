import React, { useCallback, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  MessageSquare,
  BarChart3,
  Clock,
  ClipboardList,
  Briefcase,
  Plane,
  Users,
  GraduationCap,
  Menu,
  X,
  Pin,
  PinOff,
  User,
  LogOut,
  Database,
  FileChartLine,
  MessageCircleWarning,
  DatabaseBackupIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import logo from "../assets/logo.png"; // Adjust the path as necessary
import NameLogo from "../../src/assets/nameLogo.png"; // Adjust the path as necessary
import LoginScreen from "./loginPage/LoginScreen";

interface SidebarProps {
  className?: string;
  onExpandedChange?: (expanded: boolean) => void;
}

export function Sidebar({ className, onExpandedChange }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate(); // Added for programmatic navigation

 // Get user type from localStorage (set this during login)
// const isSuperAdmin = localStorage.getItem("is_superuser") === "true";
// const isSuperAdmin = localStorage.getItem("is_superuser") === "1";
const isSuperAdmin = localStorage.getItem("is_superuser") === "1";




// SUPER ADMIN SIDEBAR MENU
const superAdminNavigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
    current: location.pathname === "/",
  },
  {
    name: "Organisation",
    icon: Users,
    path: "/org-details",
    current: location.pathname === "/org-details",
  },

  // {
  //   name: "Action Log View",
  //   icon: MessageCircleWarning,
  //   path: "/action-log",
  //   current: location.pathname === "/action-log",
  // },
];

// NORMAL USER SIDEBAR MENU (your existing full menu)
const normalNavigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
    current: location.pathname === "/",
  },
  {
    name: "Attendance",
    icon: Calendar,
    path: "/attendance",
    current: location.pathname === "/attendance",
  },
  {
    name: "Locations",
    icon: MapPin,
    path: "/locations",
    current: location.pathname === "/locations",
  },
  {
    name: "Manage",
    icon: MessageSquare,
    path: "/manage",
    current: location.pathname === "/manage",
  },
  {
    name: "Analyze",
    icon: FileChartLine,
    path: "/analyze",
    current: location.pathname === "/analyze",
  },
  {
    name: "Expense",
    icon: BarChart3,
    path: "/expense",
    current: location.pathname === "/expense",
  },
  {
    name: "Time Sheet",
    icon: Clock,
    path: "/timesheet",
    current: location.pathname === "/timesheet",
  },
  {
    name: "Task Details",
    icon: ClipboardList,
    path: "/tasks",
    current: location.pathname === "/tasks",
  },
  {
    name: "Forms",
    icon: Briefcase,
    path: "/forms",
    current: location.pathname === "/forms",
  },
  {
    name: "Calendar",
    icon: Plane,
    path: "/leave",
    current: location.pathname === "/leave",
  },
  {
    name: "CRM Summary",
    icon: Users,
    path: "/crm",
    current: location.pathname === "/crm",
  },
  {
    name: "Action Log View",
    icon: MessageCircleWarning,
    path: "/action-log",
    current: location.pathname === "/action-log",
  },
  {
    name: "Learn",
    icon: GraduationCap,
    path: "/learn",
    current: location.pathname === "/learn",
  },
  {
    name: "Configure",
    icon: Database,
    path: "/configure",
    current: location.pathname === "/configure",
  },
  {
    name: "Holiday Calendar",
    icon: Calendar,
    path: "/holiday-calendar",
    current: location.pathname === "/holiday-calendar",
  },
  {
    name: "Dynamic Form",
    icon: DatabaseBackupIcon,
    path: "/dynamic-form",
    current: location.pathname === "/dynamic-form",
  },
  {
    name: "User Location",
    icon: DatabaseBackupIcon,
    path: "/user-location",
    current: location.pathname === "/user-location",
  },
  {
    name: "Shift Calendar",
    icon: DatabaseBackupIcon,
    path: "/shift-roster",
    current: location.pathname === "/shift-roster",
  },
];

const navigation = isSuperAdmin ? superAdminNavigation : normalNavigation;



  // Controls whether the sidebar is permanently expanded (locked) on desktop
  const [isLockedExpanded, setIsLockedExpanded] = useState(false);
  // Tracks hover state to temporarily expand when not locked
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isExpanded = useMemo(() => {
    return isMobileOpen || isLockedExpanded || isHovering;
  }, [isMobileOpen, isLockedExpanded, isHovering]);

  // Inform parent about expansion changes (desktop only margin purposes)
  React.useEffect(() => {
    onExpandedChange?.(isExpanded);
  }, [isExpanded, onExpandedChange]);

  const handleMouseEnter = useCallback(() => {
    // Only expand on hover if not mobile and not locked
    if (!isLockedExpanded) {
      setIsHovering(true);
    }
  }, [isLockedExpanded]);

  const handleMouseLeave = useCallback(() => {
    if (!isLockedExpanded) {
      setIsHovering(false);
    }
  }, [isLockedExpanded]);

  return (
    <>
      <style>{`
        /* Hide scrollbar for Chrome, Safari, and Opera */
        ::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge, and Firefox */
        * {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
      `}</style>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out group/sidebar",
          isExpanded ? "w-64" : "w-16",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex h-full flex-col">
          {/* Top (logo + controls) - fixed */}
          <div className="flex items-center h-16 px-3">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Faceviz Logo"
                className="w-8 h-8 object-contain"
              />
              {isExpanded && (
                <img
                  src={NameLogo}
                  alt="Faceviz Full Logo"
                  className="h-8 object-contain"
                />
              )}
            </div>
            {/* Lock / unlock button (desktop) */}
            <div className="ml-auto hidden md:flex items-center">
              {isExpanded && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsLockedExpanded(!isLockedExpanded)}
                  title={isLockedExpanded ? "Unlock sidebar" : "Lock sidebar"}
                >
                  {isLockedExpanded ? (
                    <Pin className="w-4 h-4" />
                  ) : (
                    <PinOff className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Middle (navigation) - scrollable */}
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center rounded-xl transition-all duration-200 group",
                  isExpanded ? "px-3 py-2" : "px-2 py-2 justify-center",
                  item.current
                    ? "bg-[#f3f4fb] text-primary shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-md",
                    "w-8 h-8",
                    item.current
                      ? "bg-[#e8ebf7] text-primary"
                      : "bg-gray-100 text-gray-600 group-hover:bg-[#e8ebf7] group-hover:text-primary dark:bg-gray-800 dark:text-gray-300"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                {isExpanded && (
                  <span className="ml-3 text-sm font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom actions - fixed */}
          {isExpanded && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center py-6"
                  size="sm"
                  onClick={() => {
                    navigate("/tickets");
                    setIsMobileOpen(false);
                  }} // Added navigation on click
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full text-primary dark:text-white mb-1">
                    <ClipboardList className="w-4 h-4" />
                  </div>
                  <span className="text-xs">Tickets</span>{" "}
                  {/* Fixed typo from "Ticketss" */}
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center py-6"
                  size="sm"
                  onClick={() => {
                    navigate("/profile"); // Navigate to profile
                    setIsMobileOpen(false);
                  }}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full text-primary dark:text-white mb-1">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs">Profile</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center py-6"
                  size="sm"
                  onClick={() => {
                    navigate("/login"); // Navigate to login
                    setIsMobileOpen(false);
                  }}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full text-primary dark:text-white mb-1">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="text-xs">Sign out</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
