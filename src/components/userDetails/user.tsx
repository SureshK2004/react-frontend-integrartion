import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: string;
  name: string;
  employeeId: string;
  date: string;
  department: string;
  pu: string;
  status: 'Active' | 'Inactive';
  avatar: string;
  avatarColor: string;
  firstPunchIn: string;
  lastPunchOut: string;
  totalHour: string;
}

interface UserTableProps {
  users?: User[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  mode?: 'attendance' | 'ticket' | 'onboarding' | 'user';
  selectedRows?: Set<number>;
  assignedRows?: Set<number>;
  onRowSelect?: (index: number, employeesCount: number) => void;
  onSelectAll?: (employeesCount: number) => void;
  onAssignToggle?: (index: number) => void;
  selectAll?: boolean;
  renderActionColumn?: (user: User, index: number) => React.ReactNode;
  actionColumnHeader?: string;
}

export const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Abinash',
    employeeId: 'DM 0001',
    date: '03-09-2024',
    department: 'UI UX',
    pu: '2024-09',
    status: 'Active',
    avatar: 'A',
    avatarColor: 'bg-green-500',
    firstPunchIn: '09:15 AM',
    lastPunchOut: '06:30 PM',
    totalHour: '9h 15m'
  },
  {
    id: '2',
    name: 'Ashok',
    employeeId: 'DM 0002',
    date: '03-09-2024',
    department: 'Frontend',
    pu: '2024-09',
    status: 'Active',
    avatar: 'A',
    avatarColor: 'bg-orange-500',
    firstPunchIn: '08:45 AM',
    lastPunchOut: '05:45 PM',
    totalHour: '9h 0m'
  },
  {
    id: '3',
    name: 'Akash',
    employeeId: 'DM 0003',
    date: '03-09-2024',
    department: 'Backend',
    pu: '2024-09',
    status: 'Inactive',
    avatar: 'A',
    avatarColor: 'bg-blue-500',
    firstPunchIn: 'N/A',
    lastPunchOut: 'N/A',
    totalHour: '0h 0m'
  },
  {
    id: '4',
    name: 'Kumar',
    employeeId: 'DM 0004',
    date: '03-09-2024',
    department: 'Testing',
    pu: '2024-09',
    status: 'Active',
    avatar: 'K',
    avatarColor: 'bg-purple-500',
    firstPunchIn: '10:00 AM',
    lastPunchOut: '07:15 PM',
    totalHour: '9h 15m'
  },
  {
    id: '5',
    name: 'Sugan',
    employeeId: 'DM 0005',
    date: '03-09-2024',
    department: 'Full Stack',
    pu: '2024-09',
    status: 'Active',
    avatar: 'S',
    avatarColor: 'bg-yellow-500',
    firstPunchIn: '09:00 AM',
    lastPunchOut: '06:00 PM',
    totalHour: '9h 0m'
  }
];

// View and edit icons
const ViewIcon = () => (
  <svg className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4 text-gray-600 hover:text-green-600 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const UserTable: React.FC<UserTableProps> = ({
  users = [],
  loading = false,
  error = null,
  onRetry,
  mode = 'attendance',
  selectedRows = new Set(),
  assignedRows = new Set(),
  onRowSelect = () => {},
  onSelectAll = () => {},
  onAssignToggle = () => {},
  selectAll = false,
  renderActionColumn,
  actionColumnHeader = "Action"
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  const displayUsers = users.length > 0 ? users : defaultUsers;

  const totalPages = Math.ceil(displayUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = displayUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleUserClick = (user: User) => {
    if (mode === 'attendance') {
      navigate('/user-location', { 
        state: { 
          userData: user 
        } 
      });
    }
  };

  const getDepartmentColor = (department: string): string => {
    const colors: { [key: string]: string } = {
      'UI UX': 'text-teal-600 dark:text-teal-400',
      'Frontend': 'text-pink-600 dark:text-pink-400',
      'Backend': 'text-purple-600 dark:text-purple-400',
      'Testing': 'text-green-600 dark:text-green-400',
      'Full Stack': 'text-orange-600 dark:text-orange-400'
    };
    return colors[department] || 'text-gray-600 dark:text-gray-400';
  };

  // Updated attendance columns to match the new structure
  const attendanceColumns = [
    { key: 'select', label: 'Select', sortable: false },
    { key: 'employeeId', label: 'Employee Id', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'firstPunchIn', label: 'First punch in', sortable: false },
    { key: 'lastPunchOut', label: 'Last punch out', sortable: false },
    { key: 'totalHour', label: 'Total Hour', sortable: false },
  ];

  const ticketColumns = [
    { key: 'select', label: 'Select', sortable: false },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'employeeId', label: 'Employee ID', sortable: true },
    { key: 'type', label: 'Type', sortable: false },
    { key: 'priority', label: 'Priority', sortable: false },
    { key: 'action', label: 'Action', sortable: false },
  ];

  const onboardingColumns = [
    { key: 'select', label: 'Select', sortable: false },
    ...(renderActionColumn ? [{ key: 'action', label: actionColumnHeader, sortable: false }] : []),
    { key: 'name', label: 'Name', sortable: true },
    { key: 'employeeId', label: 'Employee ID', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'pu', label: 'Pu', sortable: false },
    { key: 'status', label: 'Status', sortable: false },
  ];

  const userColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'employeeId', label: 'Employee ID', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'punch In', label: 'Punch In', sortable: false },
    { key: 'status', label: 'Status', sortable: false },
    ...(renderActionColumn ? [{ key: 'action', label: actionColumnHeader, sortable: false }] : []),
  ];

  const columns = mode === 'ticket' ? ticketColumns : 
                 mode === 'onboarding' ? onboardingColumns : 
                 mode === 'user' ? userColumns : 
                 attendanceColumns;
  
  const tableId = mode === 'ticket' ? 'ticket-table' : 
                  mode === 'onboarding' ? 'onboarding-table' : 
                  mode === 'user' ? 'user-management-table' : 
                  'attendance-user-table';

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p>{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded hover:bg-red-700 dark:hover:bg-red-800"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="overflow-x-auto">
        <table id={tableId} className="min-w-full" style={{ minWidth: '120%' }}>
          <thead>
            <tr className="bg-primary">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-white whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    {column.key === 'select' ? (
                      mode === 'ticket' ? (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={() => onSelectAll(displayUsers.length)}
                            className="w-4 h-4 text-white border-white rounded focus:ring-white bg-primary checked:bg-white"
                          />
                          <span className="ml-2 text-sm font-semibold text-white">Select</span>
                        </div>
                      ) : (
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-white border-white rounded focus:ring-white bg-primary checked:bg-white"
                        />
                      )
                    ) : (
                      <>
                        <span>{column.label}</span>
                        {column.sortable && (
                          <ArrowUpDown className="w-4 h-4 text-white" />
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  mode === 'attendance' ? 'cursor-pointer' : ''
                }`}
                onClick={() => mode === 'attendance' && handleUserClick(user)}
              >
                {/* Select checkbox column */}
                {columns.some(col => col.key === 'select') && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={mode === 'ticket' ? selectedRows.has(startIndex + index) : false}
                      onChange={() => mode === 'ticket' && onRowSelect(startIndex + index, displayUsers.length)}
                      className="w-4 h-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 bg-white dark:bg-gray-800"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                
                {/* Attendance mode specific columns */}
                {mode === 'attendance' ? (
                  <>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap font-mono font-medium">
                      {user.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-semibold text-sm`}>
                          {user.avatar}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{user.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${getDepartmentColor(user.department)}`}>
                        {user.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.firstPunchIn === 'N/A' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {user.firstPunchIn}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.lastPunchOut === 'N/A' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {user.lastPunchOut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        user.totalHour === '0h 0m'
                          ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                      }`}>
                        {user.totalHour}
                      </span>
                    </td>
                  </>
                ) : mode === 'onboarding' ? (
                  <>
                    {renderActionColumn && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderActionColumn(user, startIndex + index)}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-semibold text-sm`}>
                          {user.avatar}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{user.employeeId}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{user.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${getDepartmentColor(user.department)}`}>
                        {user.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{user.pu}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <span className={`font-medium ${
                          user.status === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                  </>
                ) : mode === 'user' ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-semibold text-sm`}>
                          {user.avatar}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{user.employeeId}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{user.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${getDepartmentColor(user.department)}`}>
                        {user.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{user.pu}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <span className={`font-medium ${
                          user.status === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    {renderActionColumn && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderActionColumn(user, startIndex + index)}
                      </td>
                    )}
                  </>
                ) : (
                  // Ticket mode
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <select className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 appearance-none pr-8">
                          <option>Type 1</option>
                          <option>Type 2</option>
                          <option>Type 3</option>
                        </select>
                        <ChevronDown className="w-4 h-4 -ml-6 text-gray-400 dark:text-gray-500 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <select className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 appearance-none pr-8">
                          <option>Priority 1</option>
                          <option>Priority 2</option>
                          <option>Priority 3</option>
                        </select>
                        <ChevronDown className="w-4 h-4 -ml-6 text-gray-400 dark:text-gray-500 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAssignToggle(startIndex + index);
                        }}
                        className={`${
                          assignedRows.has(startIndex + index) 
                            ? 'bg-green-200 dark:bg-green-700 text-green-700 dark:text-green-300' 
                            : 'bg-orange-200 dark:bg-orange-700 text-orange-700 dark:text-orange-300'
                        } px-6 py-2 rounded-full text-sm font-medium`}
                      >
                        {assignedRows.has(startIndex + index) ? 'Assigned' : 'Assign'}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm mr-4 text-gray-600 dark:text-gray-400">
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

export default UserTable;