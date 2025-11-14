// Updated weeklyPage.tsx
import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import ExportComponent from '../exportOption/exportTo';
import WeeklyCalendarTable, { WeeklyCalendarUser } from '../attendanceDetail/WeeklyCalendarTable';
import CommonFilters, { FilterConfig } from '../filtersDetails/filters';

const WeeklyPage: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [calendarUsers, setCalendarUsers] = useState<WeeklyCalendarUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sample data matching your screenshot
  const sampleCalendarUsers: WeeklyCalendarUser[] = [
    {
      id: '1',
      name: 'Abbas Ali',
      employeeId: 'DM 0001',
      avatar: 'AA',
      avatarColor: 'bg-blue-500',
      weeklyData: {
        '2024-10-20': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-21': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-22': { firstPunchIn: '09:00', lastPunchOut: '06:00', totalHours: '9h 0m' },
        '2024-10-23': { firstPunchIn: '09:00', lastPunchOut: '06:00', totalHours: '9h 0m' },
        '2024-10-24': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-25': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-26': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
      }
    },
    {
      id: '2',
      name: 'Abinash',
      employeeId: 'DM 0002',
      avatar: 'A',
      avatarColor: 'bg-green-500',
      weeklyData: {
        '2024-10-20': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-21': { firstPunchIn: '09:15', lastPunchOut: '03:00', totalHours: '5h 41m' },
        '2024-10-22': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-23': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-24': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-25': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-26': { firstPunchIn: '09:15', lastPunchOut: '03:00', totalHours: '5h 41m' },
      }
    },
    {
      id: '3',
      name: 'Abishek A',
      employeeId: 'DM 0003',
      avatar: 'AA',
      avatarColor: 'bg-orange-500',
      weeklyData: {
        '2024-10-20': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-21': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-22': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-23': { firstPunchIn: '09:00', lastPunchOut: '06:00', totalHours: '9h 0m' },
        '2024-10-24': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-25': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-26': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
      }
    },
    {
      id: '4',
      name: 'Akash C',
      employeeId: 'DM 0004',
      avatar: 'AC',
      avatarColor: 'bg-purple-500',
      weeklyData: {
        '2024-10-20': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-21': { firstPunchIn: '09:00', lastPunchOut: '06:52', totalHours: '9h 52m' },
        '2024-10-22': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-23': { firstPunchIn: '09:00', lastPunchOut: '06:00', totalHours: '9h 0m' },
        '2024-10-24': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-25': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-26': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
      }
    },
    {
      id: '5',
      name: 'Anbuselvan',
      employeeId: 'DM 0005',
      avatar: 'A',
      avatarColor: 'bg-indigo-500',
      weeklyData: {
        '2024-10-20': { firstPunchIn: '09:00', lastPunchOut: '05:51', totalHours: '8h 51m' },
        '2024-10-21': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-22': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-23': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-24': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-25': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-26': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
      }
    },
    {
      id: '5',
      name: 'Anbuselvan',
      employeeId: 'DM 0005',
      avatar: 'A',
      avatarColor: 'bg-indigo-500',
      weeklyData: {
        '2024-10-20': { firstPunchIn: '09:00', lastPunchOut: '05:51', totalHours: '8h 51m' },
        '2024-10-21': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-22': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-23': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-24': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-25': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-26': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
      }
    },
    {
      id: '5',
      name: 'Anbuselvan',
      employeeId: 'DM 0005',
      avatar: 'A',
      avatarColor: 'bg-indigo-500',
      weeklyData: {
        '2024-10-20': { firstPunchIn: '09:00', lastPunchOut: '05:51', totalHours: '8h 51m' },
        '2024-10-21': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-22': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-23': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-24': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-25': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
        '2024-10-26': { firstPunchIn: '0h 0m', lastPunchOut: '0h 0m', totalHours: '0h 0m' },
      }
    }
  ];

  const handlePreviousWeek = () => {
    const newWeek = new Date(selectedWeek);
    newWeek.setDate(selectedWeek.getDate() - 7);
    setSelectedWeek(newWeek);
  };

  const handleNextWeek = () => {
    const newWeek = new Date(selectedWeek);
    newWeek.setDate(selectedWeek.getDate() + 7);
    setSelectedWeek(newWeek);
  };

  const handleUserClick = (user: WeeklyCalendarUser) => {
    console.log('User clicked:', user);
    // Navigate to user details or open modal
  };

  // Load data when week changes
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCalendarUsers(sampleCalendarUsers);
      setLoading(false);
    }, 500);
  }, [selectedWeek]);

  const handleFilterChange = (filters: any) => {
    console.log('Weekly filters changed:', filters);
  };

  const handleSearch = (query: string) => {
    console.log('Weekly search query:', query);
  };

  const handleRefresh = () => {
    console.log('Weekly refresh clicked');
  };

  const weeklyFilterConfig = {
    showFromDate: true,
    showToDate: true,
    showZone: true,
    showBranch: true,
    showDepartment: true,
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,
    labels: {
      searchPlaceholder: "Search users",
      from: "From Date",
      to: "To Date"
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Filters */}
      <div className="mb-6">
        <CommonFilters config={weeklyFilterConfig} showTopFilters={true} />
      </div>
      
      {/* Calendar Table */}
      <div className="mb-6">
        <WeeklyCalendarTable
          users={calendarUsers}
          selectedWeek={selectedWeek}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
          onUserClick={handleUserClick}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default WeeklyPage;