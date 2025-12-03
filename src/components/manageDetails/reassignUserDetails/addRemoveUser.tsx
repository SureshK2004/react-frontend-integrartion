import React, { useState } from 'react';
import { X, UserPlus, ChevronDown, Trash2 } from 'lucide-react';

// Define interfaces for modal
interface ModalUser {
  id: string;
  name: string;
  role: string;
  tag: string;
  empId: string;
  initials: string;
  status?: string;
}

interface ModalManager {
  id: number;
  name: string;
  designation: string;
  role: string;
  teamSize: number;
  initials: string;
  department?: string;
}

interface User {
  id: number;
  name: string;
  empId: string;
  role: string;
  status: string;
}

interface AddRemoveUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  manager: ModalManager | null;
  onAddUser: (managerId: number, userData: ModalUser) => void;
  onRemoveUser?: (managerId: number, userId: number) => void;
  mode?: 'add' | 'remove';
  users?: ModalUser[];
  selectedUserForRemoval?: User | null;
}

const AddRemoveUserModal: React.FC<AddRemoveUserModalProps> = ({ 
  isOpen, 
  onClose, 
  manager, 
  onAddUser,
  onRemoveUser,
  mode = 'add',
  users = [],
  selectedUserForRemoval = null
}) => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const availableUsers: ModalUser[] = [
    { 
      id: 'ne1', 
      name: 'New Employee 1', 
      role: 'Junior Developer', 
      tag: 'Frontend', 
      empId: 'DM 0101', 
      initials: 'NE1',
      status: 'Active'
    },
    { 
      id: 'ne2', 
      name: 'New Employee 2', 
      role: 'Senior Developer', 
      tag: 'Backend', 
      empId: 'DM 0102', 
      initials: 'NE2',
      status: 'Active'
    },
    { 
      id: 'ne3', 
      name: 'New Employee 3', 
      role: 'UI Designer', 
      tag: 'Design', 
      empId: 'DM 0103', 
      initials: 'NE3',
      status: 'Active'
    },
    { 
      id: 'ne4', 
      name: 'New Employee 4', 
      role: 'QA Engineer', 
      tag: 'Testing', 
      empId: 'DM 0104', 
      initials: 'NE4',
      status: 'Active'
    },
    { 
      id: 'ne5', 
      name: 'New Employee 5', 
      role: 'DevOps Engineer', 
      tag: 'Infrastructure', 
      empId: 'DM 0105', 
      initials: 'NE5',
      status: 'Active'
    },
    { 
      id: 'ne6', 
      name: 'New Employee 6', 
      role: 'Product Manager', 
      tag: 'Management', 
      empId: 'DM 0106', 
      initials: 'NE6',
      status: 'Active'
    },
    { 
      id: 'ne7', 
      name: 'New Employee 7', 
      role: 'Data Scientist', 
      tag: 'Analytics', 
      empId: 'DM 0107', 
      initials: 'NE7',
      status: 'Active'
    },
    { 
      id: 'ne8', 
      name: 'New Employee 8', 
      role: 'Mobile Developer', 
      tag: 'Frontend', 
      empId: 'DM 0108', 
      initials: 'NE8',
      status: 'Active'
    },
    { 
      id: 'ne9', 
      name: 'New Employee 9', 
      role: 'Backend Developer', 
      tag: 'Backend', 
      empId: 'DM 0109', 
      initials: 'NE9',
      status: 'Active'
    },
    { 
      id: 'ne10', 
      name: 'New Employee 10', 
      role: 'Full Stack Developer', 
      tag: 'Full Stack', 
      empId: 'DM 0110', 
      initials: 'NE10',
      status: 'Active'
    }
  ];

  const displayUsers = mode === 'add' ? availableUsers : users;
  const isRemoveMode = mode === 'remove';

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
    setIsDropdownOpen(false);
  };

  const handleCancel = () => {
    setSelectedUser('');
    setIsDropdownOpen(false);
    onClose();
  };

  const handleAdd = () => {
    if (selectedUser && manager) {
      const userData = availableUsers.find(u => u.id === selectedUser);
      if (userData) {
        onAddUser(manager.id, userData);
        handleCancel();
      }
    }
  };

  const handleRemove = () => {
    if (selectedUserForRemoval && manager && onRemoveUser) {
      onRemoveUser(manager.id, selectedUserForRemoval.id);
      handleCancel();
    }
  };

  // For remove mode, we use the pre-selected user
  const userToRemove = isRemoveMode && selectedUserForRemoval 
    ? {
        id: selectedUserForRemoval.id.toString(),
        name: selectedUserForRemoval.name,
        role: selectedUserForRemoval.role,
        tag: selectedUserForRemoval.role,
        empId: selectedUserForRemoval.empId,
        initials: selectedUserForRemoval.name.charAt(0),
        status: selectedUserForRemoval.status
      }
    : null;

  const selectedUserData = displayUsers.find(u => u.id === selectedUser);

  if (!isOpen || !manager) return null;

  // Remove Mode - Direct Delete Confirmation (No Dropdown)
  if (isRemoveMode) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div 
          className="bg-white dark:bg-gray-800 rounded-xl border-2 border-red-500 shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-6 text-center">
            <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border-3 border-red-200 dark:border-red-700">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Remove User?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This action cannot be undone and the user will be removed from the manager's team.
            </p>
          </div>

          {/* User Card - Directly shows the selected user */}
          {userToRemove && (
            <div className="mx-6 mb-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-600 rounded-lg p-4">
              <div className="text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-wide mb-3">
                USER BEING REMOVED
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center font-bold text-blue-700 dark:text-blue-300 text-sm">
                    {userToRemove.initials}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      {userToRemove.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {userToRemove.role}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-1">
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {userToRemove.status}
                      </span>
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {userToRemove.tag}
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {userToRemove.empId}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-3 border-t border-red-300 dark:border-red-600">
                  <div className="text-left">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Current Manager:</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {manager.name}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Department:</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {manager.department || 'UI UX'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="px-6 pb-6 flex items-center justify-center gap-3">
               <button
              onClick={handleRemove}
              className="flex-1 max-w-48 px-5 py-3 bg-red-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 hover:bg-red-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Trash2 className="w-4 h-4" />
              Yes, Remove User
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 max-w-48 px-5 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
         
          </div>
        </div>
      </div>
    );
  }

  // Original Add Mode (unchanged)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add User
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Select a user to add to this manager's team
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Manager Info Card */}
          <div className="border-2 border-blue-200 dark:border-blue-700 bg-blue-50/30 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg bg-blue-600">
                  {manager.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{manager.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{manager.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">Current Team Size</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {manager.teamSize} users
                </p>
              </div>
            </div>
          </div>

          {/* User Selection Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select User to Add
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-2.5 text-left bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
              >
                <span className={selectedUser ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}>
                  {selectedUser ? selectedUserData?.name : 'Select User to Add'}
                </span>
                <ChevronDown 
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  <div className="max-h-40 overflow-y-auto">
                    {displayUsers.length > 0 ? (
                      displayUsers.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => handleUserSelect(user.id)}
                          className="w-full px-4 py-2.5 text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-3 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs font-semibold">
                            {user.initials}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                        No users available to add
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Users hint */}
            {!selectedUser && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {displayUsers.length} unassigned users available
              </p>
            )}
          </div>

          {/* Selected User Card */}
          {selectedUser && selectedUserData && (
            <div className="space-y-3 transition-all duration-300">
              <div className="border-2 border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20 rounded-lg p-4">
                <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-3">
                  Selected User
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm bg-green-600">
                      {selectedUserData.initials}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{selectedUserData.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{selectedUserData.role}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                      {selectedUserData.tag}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedUserData.empId}</p>
                  </div>
                </div>
              </div>

              {/* Team Size Update Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Team size after adding:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">{manager.teamSize}</span>
                <span className="text-gray-400">→</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {manager.teamSize + 1} users
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 pb-6 flex items-center justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-5 py-2 border-2 border-gray-500 text-gray-500 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedUser}
            className={`px-5 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedUser 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
            }`}
          >
            <UserPlus size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRemoveUserModal;