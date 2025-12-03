import React from "react";
import { ThemeToggle } from "../theme-toggle";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface TaskDetailHeadProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TaskDetailHead: React.FC<TaskDetailHeadProps> = ({ activeTab, onTabChange }) => {
  return (
    <div>


      <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Task Details
          </h2>
          <ThemeToggle />
        </div>
      </div>
      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 w-full bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="assign"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
            >
              Assign
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
            >
              Task Summary
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

    </div>
  );
};

export default TaskDetailHead;
