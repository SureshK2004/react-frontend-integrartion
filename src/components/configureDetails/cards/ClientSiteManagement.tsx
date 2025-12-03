import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import SitesManagement from "./sites";
import Client from "./Client";

type TabType = "client" | "site";

const ClientSiteManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("client");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Client & Site Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Switch between client and site configuration in one place
              </p>
            </div>
            
            {/* Right end div with Back button and ThemeToggle */}
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

          <div className="mt-3 mb-1">
            <div className="flex rounded-md bg-gray-100 dark:bg-gray-900 p-1">
              <Button
                variant={activeTab === "client" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("client")}
                className={`flex-1 items-center gap-2 rounded-md ${
                  activeTab === "client"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <Building2 className="w-4 h-4" />
                Clients
              </Button>
              <Button
                variant={activeTab === "site" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("site")}
                className={`flex-1 items-center gap-2 rounded-md ${
                  activeTab === "site"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <MapPin className="w-4 h-4" />
                Sites
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "client" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <Client />
          </div>
        )}

        {activeTab === "site" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-0">
            <SitesManagement />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientSiteManagement;