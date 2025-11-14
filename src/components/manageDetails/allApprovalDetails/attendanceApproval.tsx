import React, { useState } from 'react';
import { Mail, Phone, Search, User as UserIcon } from 'lucide-react';

interface User {
  id: string;
  name: string;
  employeeId: string;
  date: string;
  department: string;
  pu: string;
  status: 'Active' | 'Inactive';
  avatar: string;
  avatarColor: string;
}

const AttendanceApproval = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const itemsPerPage = 4;
  
  // Transform attendance data to match the exact structure from image
  const attendanceUsers: User[] = [
    { 
      id: '1', 
      name: 'Abinash', 
      employeeId: 'DM 0001', 
      date: '03-09-2024', 
      department: 'UI UX', 
      pu: '2024-09', 
      status: 'Inactive', 
      avatar: 'A', 
      avatarColor: 'bg-green-500' 
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
      avatarColor: 'bg-orange-500' 
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
      avatarColor: 'bg-blue-500' 
    },
    { 
      id: '4', 
      name: 'Kumar', 
      employeeId: 'DM 0004', 
      date: '03-09-2024', 
      department: 'Testing', 
      pu: '2024-09', 
      status: 'Inactive', 
      avatar: 'K', 
      avatarColor: 'bg-purple-500' 
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
      avatarColor: 'bg-yellow-500' 
    },
  ];

  // Pagination calculations
  const totalPages = Math.ceil(attendanceUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = attendanceUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Checkbox handlers
  const handleRowSelect = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedUsers.length) {
      setSelectedRows(new Set());
    } else {
      const allIndices = new Set(paginatedUsers.map((_, index) => startIndex + index));
      setSelectedRows(allIndices);
    }
  };

  // Custom action column renderer for attendance approval
  const renderAttendanceAction = (user: User, index: number) => (
    <div className="flex gap-2 justify-center">
      <button 
        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-sm"
        onClick={() => handleApprove(user.id)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </button>
      <button 
        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm"
        onClick={() => handleReject(user.id)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );

  const handleApprove = (userId: string) => {
    console.log('Approving attendance for user:', userId);
    // Add your approval logic here
  };

  const handleReject = (userId: string) => {
    console.log('Rejecting attendance for user:', userId);
    // Add your rejection logic here
  };

  const getStatusColor = (status: 'Active' | 'Inactive') => {
    return status === 'Active' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusDotColor = (status: 'Active' | 'Inactive') => {
    return status === 'Active' ? 'bg-green-500' : 'bg-red-500';
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Panel */}
             <div className="lg:col-span-1">
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        {/* Profile Avatar */}
                        <div className="flex flex-col items-center mb-6">
                          <div className="bg-blue-100 hover:bg-blue-200 rounded-full w-24 h-24 flex flex-col items-center justify-center transition-colors mb-4">
                            <UserIcon className="w-12 h-12 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Admin</h3>
                          <p className="text-sm text-gray-600">Project Manager</p>
                        </div>
          
                        {/* Employee Details */}
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-700">Employee ID:</span>
                            <span className="text-sm font-semibold text-gray-900">20001</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-700">Department:</span>
                            <span className="text-sm font-semibold text-gray-900">AI Department</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-700">Gender:</span>
                            <span className="text-sm font-semibold text-gray-900">Male</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-700">Date of Birth:</span>
                            <span className="text-sm font-semibold text-gray-900">11-06-1996</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-sm text-gray-700">Date of Join:</span>
                            <span className="text-sm font-semibold text-gray-900">10-08-2024</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-sm text-gray-700">Mobile:</span>
                            <span className="text-sm font-semibold text-gray-900">+91 9876543210</span>
                          </div>
                        </div>
          
                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-600 border-2 border-white rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-medium shadow-md">
                            <Mail className="w-4 h-4" />
                            Send Email
                          </button>
                          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-600 border-2 border-white rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 font-medium shadow-md">
                            <Phone className="w-4 h-4" />
                            Call Employee
                          </button>
                        </div>
                      </div>
                    </div>

          {/* Right Main Content - Attendance Table */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="bg-[#2F2E81] rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Attendance Approval</h2>
                  <p className="text-blue-100 text-sm">{attendanceUsers.length} record(s) found for Admin</p>
                </div>
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-blue-500 bg-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
                </div>
              </div>
            </div>

            {/* Custom Attendance Table - Exact match from image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {/* Horizontal scroll container */}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-[#2F2E81]">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedRows.size === paginatedUsers.length && paginatedUsers.length > 0}
                          onChange={handleSelectAll}
                          className="w-4 h-4 text-white border-white rounded focus:ring-white bg-primary checked:bg-white"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Name 1↓
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Employee ID 1↓
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Date 1↓
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Department 1↓
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Pu
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Extra Column 1
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Extra Column 2
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedUsers.map((user, index) => {
                      const globalIndex = startIndex + index;
                      return (
                        <tr 
                          key={user.id} 
                          className={globalIndex % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100 transition-colors'}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedRows.has(globalIndex)}
                              onChange={() => handleRowSelect(globalIndex)}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-semibold text-sm`}>
                                {user.avatar}
                              </div>
                              <span className="font-medium text-gray-900">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.employeeId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.pu}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getStatusDotColor(user.status)}`}></div>
                              <span className={`font-medium ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Extra Data 1
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Extra Data 2
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderAttendanceAction(user, globalIndex)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination - Exact match from image */}
              <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, attendanceUsers.length)} of {attendanceUsers.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded text-sm font-medium ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded text-sm font-medium ${
                        currentPage === page
                          ? 'bg-[#2F2E81] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded text-sm font-medium ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceApproval;