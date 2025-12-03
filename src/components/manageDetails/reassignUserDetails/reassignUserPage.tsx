import React, { useState, useMemo } from 'react';
import { ChevronDown, Users, UserCheck, UserX, User, Trash2, Search, X, UserPlus } from 'lucide-react';
import ReassignUserHead from './reassignUserHead';
import AddRemoveUserModal from './addRemoveUser';
import { CustomToast } from '@/components/ui/toast-custom';
import { useCustomToast } from '@/components/ui/toast-hooks';

// Define TypeScript interfaces
interface User {
  id: number;
  name: string;
  empId: string;
  role: string;
  status: string;
}

interface Manager {
  id: number;
  name: string;
  designation: string;
  userCount: number;
  role: string;
  teamSize: number;
  initials: string;
  users: User[];
}

interface Department {
  value: string;
  label: string;
}

interface Stat {
  label: string;
  count: number;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  iconColor: string;
}

const ReAssignUserPage: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [selectedUserForRemoval, setSelectedUserForRemoval] = useState<User | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'remove'>('add');
  const [managers, setManagers] = useState<Manager[]>([
    {
      id: 1,
      name: 'Aravinth Kumar',
      designation: 'Senior Manager',
      userCount: 5,
      role: 'Senior Manager - UI UX',
      teamSize: 15,
      initials: 'AK',
      users: [
        { id: 1, name: 'Akash Kumar', empId: 'DM 0001', role: 'Designer', status: 'Active' },
        { id: 2, name: 'Priya Sharma', empId: 'DM 0002', role: 'UI Designer', status: 'Active' },
        { id: 3, name: 'Raj Patil', empId: 'DM 0003', role: 'UX Designer', status: 'Inactive' },
        { id: 4, name: 'Maya Singh', empId: 'DM 0004', role: 'Designer', status: 'Active' },
        { id: 5, name: 'Deepak Roy', empId: 'DM 0005', role: 'Senior Designer', status: 'Active' },
      ]
    },
    { 
      id: 2, 
      name: 'Girish', 
      designation: 'Technical Manager', 
      userCount: 0, 
      role: 'Technical Manager - Development',
      teamSize: 0,
      initials: 'G',
      users: [] 
    },
    { 
      id: 3, 
      name: 'Rahul', 
      designation: 'Technical Manager', 
      userCount: 0, 
      role: 'Technical Manager - Backend',
      teamSize: 0,
      initials: 'R',
      users: [] 
    },
    { 
      id: 4, 
      name: 'Kavya', 
      designation: 'Technical Manager', 
      userCount: 0, 
      role: 'Technical Manager - Frontend',
      teamSize: 0,
      initials: 'K',
      users: [] 
    },
  ]);

  const { toast, showToast, hideToast } = useCustomToast();

  const departments: Department[] = [
    { value: 'design', label: 'Design' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'it', label: 'IT' },
  ];

  const filteredDepartments = useMemo(() => {
    if (!searchQuery) return departments;
    return departments.filter(dept =>
      dept.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, departments]);

  const stats: Stat[] = [
    { label: 'Total Users', count: 65, icon: Users, color: 'blue', bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
    { label: 'Filtered Managers', count: 4, icon: UserCheck, color: 'purple', bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
    { label: 'Assigned Users', count: 56, icon: User, color: 'green', bgColor: 'bg-green-50', iconColor: 'text-green-600' },
    { label: 'Unassigned', count: 4, icon: UserX, color: 'orange', bgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  ];

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleSelectDept = (deptValue: string) => {
    setSelectedDept(deptValue);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const clearSelection = () => {
    setSelectedDept('');
    setSearchQuery('');
  };

  // Modal handlers
  const handleOpenAddUserModal = (manager: Manager) => {
    setSelectedManager(manager);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenRemoveUserModal = (manager: Manager, user: User) => {
    setSelectedManager(manager);
    setSelectedUserForRemoval(user);
    setModalMode('remove');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedManager(null);
    setSelectedUserForRemoval(null);
  };

  const handleAddUser = (managerId: number, userData: any) => {
    setManagers(prevManagers => 
      prevManagers.map(manager => {
        if (manager.id === managerId) {
          const newUserId = Math.max(...manager.users.map(u => u.id), 0) + 1;
          const newUser: User = {
            id: newUserId,
            name: userData.name,
            empId: userData.empId,
            role: userData.role,
            status: 'Active'
          };
          
          showToast(
            'User Added Successfully!',
            `${userData.name} has been added to ${manager.name}'s team.`
          );
          
          return {
            ...manager,
            userCount: manager.userCount + 1,
            teamSize: manager.teamSize + 1,
            users: [...manager.users, newUser]
          };
        }
        return manager;
      })
    );
  };

  const handleRemoveUser = (managerId: number, userId: number) => {
    setManagers(prevManagers =>
      prevManagers.map(manager => {
        if (manager.id === managerId) {
          const userToRemove = manager.users.find(user => user.id === userId);
          const updatedUsers = manager.users.filter(user => user.id !== userId);
          
          if (userToRemove) {
            showToast(
              'User Removed Successfully!',
              `${userToRemove.name} has been removed from ${manager.name}'s team.`
            );
          }
          
          return {
            ...manager,
            userCount: updatedUsers.length,
            teamSize: updatedUsers.length,
            users: updatedUsers
          };
        }
        return manager;
      })
    );
  };

  // Convert manager users to the format needed for remove modal
  const getUsersForRemoveModal = (manager: Manager) => {
    return manager.users.map(user => ({
      id: user.id.toString(),
      name: user.name,
      role: user.role,
      tag: user.role,
      empId: user.empId,
      initials: user.name.charAt(0)
    }));
  };

  const selectedDeptLabel = departments.find(dept => dept.value === selectedDept)?.label || 'All Departments';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto pt-10">
        {/* Reassign User Head Component */}
        <ReassignUserHead />

        {/* Department Filter */}
        <div className="mb-6 relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="truncate">{selectedDeptLabel}</span>
              <div className="flex items-center gap-1">
                {selectedDept && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSelection();
                    }}
                    className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 w-full md:w-64">
                {/* Search Input */}
                <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search departments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Department Options */}
                <div className="max-h-60 overflow-y-auto">
                  <button
                    onClick={() => handleSelectDept('')}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      selectedDept === '' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    All Departments
                  </button>
                  
                  {filteredDepartments.length > 0 ? (
                    filteredDepartments.map((dept) => (
                      <button
                        key={dept.value}
                        onClick={() => handleSelectDept(dept.value)}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          selectedDept === dept.value ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {dept.label}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                      No departments found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Click outside to close */}
          {isDropdownOpen && (
            <div
              className="fixed inset-0 z-0"
              onClick={() => setIsDropdownOpen(false)}
            />
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
              <div className={`${stat.bgColor} dark:bg-gray-700 p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor} dark:text-gray-300`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Manager List Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manager List</h2>
          </div>
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
            {managers.length} Managers
          </span>
        </div>

        {/* Manager Accordions */}
        <div className="space-y-4">
          {managers.map((manager) => (
            <div key={manager.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Accordion Header */}
              <div className="bg-primary p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{manager.name}</h3>
                      <p className="text-indigo-100 dark:text-indigo-200 text-sm">{manager.designation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-1">
                      <span className="text-white text-sm font-medium">
                        {manager.userCount} {manager.userCount === 1 ? 'User' : 'Users'}
                      </span>
                    </div>
                    <button 
                      onClick={() => toggleAccordion(manager.id)}
                      className="px-4 py-2 bg-white/10 border border-white/30 text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      {openAccordion === manager.id ? 'Hide Users' : 'View Users'}
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openAccordion === manager.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    <button 
                      onClick={() => handleOpenAddUserModal(manager)}
                      className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium shadow-sm flex items-center gap-2"
                    >
                      <UserPlus size={16} />
                      Add User
                    </button>
                  </div>
                </div>
              </div>

              {/* Accordion Content */}
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openAccordion === manager.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {manager.users.length > 0 ? (
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">S.No</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">User Name</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee ID</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                          {manager.users.map((user, idx) => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300 font-medium">{idx + 1}</td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                                    <span className="text-indigo-600 dark:text-indigo-300 text-sm font-medium">{user.name.charAt(0)}</span>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white block">{user.name}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{user.empId}</td>
                              <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{user.role}</td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.status === 'Active' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <button 
                                  onClick={() => handleOpenRemoveUserModal(manager, user)}
                                  className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserX className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No users assigned</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        This manager doesn't have any team members assigned yet.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Add/Remove User Modal */}
      <AddRemoveUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        manager={selectedManager}
        onAddUser={handleAddUser}
        onRemoveUser={handleRemoveUser}
        mode={modalMode}
        users={selectedManager ? getUsersForRemoveModal(selectedManager) : []}
        selectedUserForRemoval={selectedUserForRemoval}
      />

      {/* Custom Toast */}
      <CustomToast
        isVisible={toast.isVisible}
        onClose={hideToast}
        title={toast.title}
        description={toast.description}
        duration={5000}
      />
    </div>
  );
};

export default ReAssignUserPage;