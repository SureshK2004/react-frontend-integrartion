import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Co2EmissionHeader from './Co2EmissionHeader';
import CommonFilters, { FilterConfig } from '../filtersDetails/filters';
import TodayPage from './TodayPage';
import WeekPage from './WeekPage';
import MonthPage from './MonthPage';

// Summary data
const summaryData = {
  employees: 10,
  totalDistance: '19.0 km',
  avgSpeed: '9.8 km/h',
  avgIdle: '28.8%',
  tasksCompleted: 6,
  co2Emission: '1.29 kg',
  cost: '₹ 91',
  routeDeviation: '6.5%',
  departmentStats: [
    { name: 'Sales', employees: 5, distance: '18.3 km', idle: '38%' },
    { name: 'Operations', employees: 3, distance: '0.6 km', idle: '24%' },
    { name: 'Support', employees: 2, distance: '0.0 km', idle: '13%' }
  ]
};

// User data
const userData = [
  { empId: '200240', name: 'Arun Prakash', date: '2025-09-26', start: '10:02:58', end: '14:10:50', distance: '0.94 km', idle: '34.0%', avgSpeed: '18.2 km/h', tasks: 1, co2: '0.15 kg', efficiency: '77%' },
  { empId: '200204', name: 'Girikannan', date: '2025-09-26', start: '10:02:58', end: '14:10:50', distance: '13.30 km', idle: '82.0%', avgSpeed: '22.4 km/h', tasks: 2, co2: '0.80 kg', efficiency: '20%' },
  { empId: '200223', name: 'Malasri P', date: '2025-09-26', start: '10:02:58', end: '14:10:50', distance: '0.01 km', idle: '12.0%', avgSpeed: '3.3 km/h', tasks: 0, co2: '0.01 kg', efficiency: '88%' },
  { empId: '200216', name: 'Siva', date: '2025-09-26', start: '10:02:58', end: '14:10:50', distance: '1.82 km', idle: '26.0%', avgSpeed: '16.1 km/h', tasks: 1, co2: '0.11 kg', efficiency: '79%' }
];

const Co2Emission: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path.includes('/week')) return 'week';
    if (path.includes('/month')) return 'month';
    return 'today';
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath());
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    nameOrId: '',
    department: '',
    zone: '',
    branch: ''
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'today') {
      navigate('/co2-emission');
    } else {
      navigate(`/co2-emission/${tab}`);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
    console.log('Filters applied:', newFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setFilters({
      nameOrId: '',
      department: '',
      zone: '',
      branch: ''
    });
    console.log('Refreshed');
  };

  const filterConfig: FilterConfig = {
    showUserType: true,
    showDepartment: true,
    showZone: true,
    showBranch: true,
    showFromDate: true,
    showToDate: true,
    showFilterForm: true,
    showColumnSelector: true,
    labels: {
      userType: 'Name or ID',
      department: 'Department',
      zone: 'Zone',
      branch: 'Branch',
      from: 'From',
      to: 'To',
      filter: 'Filter',
      searchPlaceholder: 'Search by Name or ID'
    },
    options: {
      userType: ['Arun Prakash', 'Girikannan', 'Malasri P', 'Siva'],
      department: ['Sales', 'Operations', 'Support'],
      zone: ['North', 'South', 'East', 'West'],
      branch: ['Main', 'Downtown', 'Uptown']
    },
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,
    customStyles: {
      searchInput: 'w-48',
      filterContainer: 'flex flex-row gap-4 items-center flex-wrap',
      dropdown: 'w-40'
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      <Co2EmissionHeader activeTab={activeTab} setActiveTab={handleTabChange} />
      {activeTab === 'today' && (
        <>
          <CommonFilters config={filterConfig} showTopFilters={true} />
          <TodayPage summaryData={summaryData} userData={userData} />
        </>
      )}
      {activeTab === 'week' && <WeekPage />}
      {activeTab === 'month' && <MonthPage />}
    </div>
  );
};

export default Co2Emission;