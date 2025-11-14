import React from 'react';
import { Users, Map, Gauge, Clock, CheckCircle, DollarSign, Navigation, Leaf } from 'lucide-react';

interface SummaryData {
  employees: number;
  totalDistance: string;
  avgSpeed: string;
  avgIdle: string;
  tasksCompleted: number;
  co2Emission: string;
  cost: string;
  routeDeviation: string;
  departmentStats: { name: string; employees: number; distance: string; idle: string }[];
}

interface UserData {
  empId: string;
  name: string;
  date: string;
  start: string;
  end: string;
  distance: string;
  idle: string;
  avgSpeed: string;
  tasks: number;
  co2: string;
  efficiency: string;
}

interface TodayPageProps {
  summaryData: SummaryData;
  userData: UserData[];
}

const TodayPage: React.FC<TodayPageProps> = ({ summaryData, userData }) => {
  const cardConfig = [
    { 
      icon: Users, 
      label: 'Employees', 
      value: summaryData.employees, 
      color: 'text-green-600',
      borderColor: 'border-l-green-500',
      bgGradient: 'from-green-50 to-white dark:from-green-900/20 dark:to-gray-800',
      iconBg: 'bg-green-100 dark:bg-green-900/30'
    },
    { 
      icon: Map, 
      label: 'Total Distance', 
      value: summaryData.totalDistance, 
      color: 'text-blue-600',
      borderColor: 'border-l-blue-500',
      bgGradient: 'from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30'
    },
    { 
      icon: Gauge, 
      label: 'Avg Speed', 
      value: summaryData.avgSpeed, 
      color: 'text-yellow-600',
      borderColor: 'border-l-yellow-500',
      bgGradient: 'from-yellow-50 to-white dark:from-yellow-900/20 dark:to-gray-800',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    { 
      icon: Clock, 
      label: 'Avg Idle %', 
      value: summaryData.avgIdle, 
      color: 'text-red-600',
      borderColor: 'border-l-red-500',
      bgGradient: 'from-red-50 to-white dark:from-red-900/20 dark:to-gray-800',
      iconBg: 'bg-red-100 dark:bg-red-900/30'
    },
    { 
      icon: CheckCircle, 
      label: 'Tasks Completed', 
      value: summaryData.tasksCompleted, 
      color: 'text-purple-600',
      borderColor: 'border-l-purple-500',
      bgGradient: 'from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30'
    },
    { 
      icon: Leaf, 
      label: 'CO₂ Emission', 
      value: summaryData.co2Emission, 
      color: 'text-teal-600',
      borderColor: 'border-l-teal-500',
      bgGradient: 'from-teal-50 to-white dark:from-teal-900/20 dark:to-gray-800',
      iconBg: 'bg-teal-100 dark:bg-teal-900/30'
    },
    { 
      icon: DollarSign, 
      label: 'Cost', 
      value: summaryData.cost, 
      color: 'text-indigo-600',
      borderColor: 'border-l-indigo-500',
      bgGradient: 'from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30'
    },
    { 
      icon: Navigation, 
      label: 'Route Deviation', 
      value: summaryData.routeDeviation, 
      color: 'text-pink-600',
      borderColor: 'border-l-pink-500',
      bgGradient: 'from-pink-50 to-white dark:from-pink-900/20 dark:to-gray-800',
      iconBg: 'bg-pink-100 dark:bg-pink-900/30'
    },
  ];

  const departmentColors = [
    'border-l-blue-400 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800',
    'border-l-green-400 bg-gradient-to-r from-green-50 to-white dark:from-green-900/20 dark:to-gray-800',
    'border-l-purple-400 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800',
    'border-l-orange-400 bg-gradient-to-r from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-800',
  ];

  return (
    <div className="text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Monitor travel, idle, and outcomes at a glance
      </p>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {cardConfig.map((item, index) => (
          <div
            key={index}
            className={`
              relative p-6 rounded-xl shadow-md hover:shadow-xl 
              transition-all duration-300 border-l-4 ${item.borderColor}
              bg-gradient-to-br ${item.bgGradient}
              group hover:scale-[1.02] cursor-pointer
              border border-gray-100 dark:border-gray-700
            `}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${item.iconBg} transition-colors duration-300 group-hover:scale-110`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                  {item.label}
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {item.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Department Stats */}
      <div className="flex flex-wrap gap-6 mb-6">
        {summaryData.departmentStats.map((dept, index) => (
          <div
            key={index}
            className={`
              flex-1 min-w-[200px] p-4 rounded-lg shadow-lg border-l-4 
              ${departmentColors[index % departmentColors.length]}
              border border-gray-200 dark:border-gray-700
              hover:shadow-xl transition-all duration-300
            `}
          >
            <p className="text-gray-800 dark:text-gray-100 font-semibold mb-2">{dept.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {dept.employees} emp - {dept.distance} - Idle {dept.idle}
            </p>
          </div>
        ))}
      </div>

      {/* Employee Table - Unchanged */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 p-4">Employee Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-primary">
                {[
                  'Emp ID',
                  'Name',
                  'Date',
                  'Start',
                  'End',
                  'Distance',
                  'Idle %',
                  'Avg Speed',
                  'Tasks',
                  'CO₂',
                  'Efficiency',
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-4 text-left text-sm font-semibold text-white whitespace-nowrap"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {userData.map((user, index) => (
                <tr
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{user.empId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.start}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.end}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.distance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.idle}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.avgSpeed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.tasks}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.co2}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        user.efficiency === '77%'
                          ? 'bg-yellow-500'
                          : user.efficiency === '20%'
                          ? 'bg-red-500'
                          : 'bg-green-500'
                      }`}
                    >
                      {user.efficiency}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm mr-4 text-gray-600 dark:text-gray-400">
            Showing 1 to 4 of 4 entries
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayPage;