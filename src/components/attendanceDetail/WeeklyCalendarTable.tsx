// WeeklyCalendarTable.tsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, endOfWeek, addDays, isSaturday, isSunday } from 'date-fns';

export interface WeeklyCalendarUser {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  employeeId: string;
  weeklyData: {
    [date: string]: {
      firstPunchIn: string;
      lastPunchOut: string;
      totalHours: string;
    };
  };
}

interface WeeklyCalendarTableProps {
  users: WeeklyCalendarUser[];
  selectedWeek: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onUserClick?: (user: WeeklyCalendarUser) => void;
  loading?: boolean;
  error?: string | null;
}

const WeeklyCalendarTable: React.FC<WeeklyCalendarTableProps> = ({
  users,
  selectedWeek,
  onPreviousWeek,
  onNextWeek,
  onUserClick,
  loading = false,
  error = null
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 users per page

  // Generate week dates (Monday to Sunday)
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const formatWeekRange = (date: Date): string => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = endOfWeek(date, { weekStartsOn: 1 });
    return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd')}`;
  };

  const formatDateHeader = (date: Date): string => format(date, 'dd');

  const getTotalHoursForUser = (user: WeeklyCalendarUser): string => {
    let totalMinutes = 0;
    Object.values(user.weeklyData).forEach(dayData => {
      if (dayData.totalHours !== '0h 0m') {
        const match = dayData.totalHours.match(/(\d+)h (\d+)m/);
        if (match) {
          totalMinutes += parseInt(match[1]) * 60 + parseInt(match[2]);
        }
      }
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const getBadgeClassName = (time: string): string => {
    if (time === '0h 0m') return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
  };

  const getTimeBadgeClassName = (time: string): string => {
    if (time === '0h 0m') return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  };

  // Pagination logic
  const displayUsers = users;
  const totalPages = Math.ceil(displayUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = displayUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading timesheet...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      {/* Header with week navigation */}
      <div className="px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-xl font-semibold text-primary">Weekly Timesheet</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={onPreviousWeek}
              className="p-2 text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="bg-primary px-4 py-2 rounded-full text-sm font-medium text-white">
              {formatWeekRange(selectedWeek)}
            </div>
            <button
              onClick={onNextWeek}
              className="p-2 text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Next week"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full" style={{ minWidth: '140%' }}>
          <thead className="bg-primary">
            <tr>
              {/* Employee column */}
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                Employee
              </th>
              {/* Day columns */}
              {weekDates.map((date) => (
                <th
                  key={format(date, 'yyyy-MM-dd')}
                  className="px-3 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className={`font-bold text-sm ${isSaturday(date) || isSunday(date) ? 'text-red-200' : ''}`}>
                      {formatDateHeader(date)}
                    </span>
                    <span className="text-xs opacity-75">
                      {format(date, 'EEE')}
                    </span>
                  </div>
                </th>
              ))}
              {/* Total column */}
              <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className={`bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer`}
                onClick={() => onUserClick?.(user)}
              >
                {/* Employee column */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{user.employeeId}</div>
                    </div>
                  </div>
                </td>
                
                {/* Day columns */}
                {weekDates.map((date) => {
                  const dateKey = format(date, 'yyyy-MM-dd');
                  const dayData = user.weeklyData[dateKey] || { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' };
                  
                  return (
                    <td
                      key={dateKey}
                      className={`px-3 py-4 text-center align-top ${
                        isSaturday(date) || isSunday(date) ? 'bg-red-50 dark:bg-red-900/20' : ''
                      }`}
                    >
                      <div className="space-y-1">
                        {dayData.totalHours !== '0h 0m' && (
                          <div className={`mx-auto w-16 px-2 py-1 rounded-full text-xs font-medium ${getBadgeClassName(dayData.totalHours)}`}>
                            {dayData.totalHours}
                          </div>
                        )}
                        <div className={`mx-auto w-20 px-2 py-1 rounded-full text-xs font-medium ${getTimeBadgeClassName(dayData.lastPunchOut)}`}>
                          {dayData.lastPunchOut}
                        </div>
                      </div>
                    </td>
                  );
                })}
                
                {/* Total column */}
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getBadgeClassName(getTotalHoursForUser(user))}`}>
                    {getTotalHoursForUser(user)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, displayUsers.length)} of {displayUsers.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 1
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === totalPages
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendarTable;