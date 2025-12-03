import { ArrowLeft } from "lucide-react";
import React from "react";
import { ThemeToggle } from "../theme-toggle";
import { useNavigate } from "react-router-dom";

interface TicketHeaderProps {
  activeTab: "ticket" | "summary";
  setActiveTab: (tab: "ticket" | "summary") => void;
  toggleType: "self" | "datamooai";
  setToggleType: (type: "self" | "datamooai") => void;
}

const TicketHeader: React.FC<TicketHeaderProps> = ({
  activeTab,
  setActiveTab,
  toggleType,
  setToggleType,
}) => {
  const mainTabs = [
    { id: "ticket", label: "Ticket" },
    { id: "summary", label: "Summary" },
  ];
  const navigate = useNavigate();
  // 👇 Dynamic toggle label
  const toggleLabel =
    toggleType === "datamooai" ? "See Self Tickets" : "See Datamoo.ai Tickets";

  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-6 py-6">
      <div className="max-w-8xl mx-auto">
        {/* title header Top bar*/}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ticket
              </h2>
            </div>
            {/* Back Button + Theme */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ArrowLeft size={18} />
                Back
              </button>
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            {/* Left side - Ticket/Summary buttons */}
            <div className="flex gap-2">
              {mainTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "ticket" | "summary")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === tab.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right side - Single toggle button */}
            <button
              onClick={() =>
                setToggleType(toggleType === "datamooai" ? "self" : "datamooai")
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${toggleType
                ? "bg-primary text-white shadow-md"
                : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600"
                }`}      >
              {toggleLabel}
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default TicketHeader;
