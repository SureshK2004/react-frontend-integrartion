// components/locationDetail/reassignUserHead.tsx
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { ArrowLeft, Calendar, Clock, BarChart3, ChevronDown, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TabType = "attendance" | "leave" | "summary";

interface AllApprovalHeadProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

interface Employee {
  id: number;
  name: string;
  value: string;
}

const AllApprovalHead: React.FC<AllApprovalHeadProps> = ({ 
  activeTab = "attendance", 
  onTabChange 
}) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { 
      id: "attendance" as TabType, 
      label: "Attendance Approval", 
      icon: Clock,
    },
    { 
      id: "leave" as TabType, 
      label: "Leave Approval", 
      icon: Calendar,
    },
    { 
      id: "summary" as TabType, 
      label: "Leave Summary", 
      icon: BarChart3,
    },
  ];

  // Mock employee data based on your new image
  const employees: Employee[] = [
    { id: 1, name: "200/01 - Admin", value: "200/01" },
    { id: 2, name: "201/02 - Manager", value: "201/02" },
    { id: 3, name: "202/03 - Designer", value: "202/03" },
    { id: 4, name: "203/04 - Sales", value: "203/04" },
    { id: 5, name: "204/05 - Officer", value: "204/05" },
  ];

  // Filter employees based on search term
  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const handleTabClick = (tabId: TabType) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const clearSelection = () => {
    setSelectedEmployee(null);
    setSearchTerm('');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            All Approval
          </h2>
          
          {/* Searchable Employee Dropdown */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              {/* Dropdown Trigger Button */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[200px] hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
              >
                <span className="truncate">
                  {selectedEmployee ? selectedEmployee.name : "Select Employee"}
                </span>
                <div className="flex items-center gap-1 ml-2">
                  {selectedEmployee && (
                    <X 
                      className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" 
                      onClick={(e) => {
                        e.stopPropagation();
                        clearSelection();
                      }}
                    />
                  )}
                  <ChevronDown 
                    size={18} 
                    className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
                  {/* Search Input */}
                  <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        autoFocus
                      />
                    </div>
                  </div>
                  
                  {/* Employee List */}
                  <div className="max-h-48 overflow-y-auto">
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <button
                          key={employee.id}
                          onClick={() => handleEmployeeSelect(employee)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 ${
                            selectedEmployee?.id === employee.id 
                              ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {employee.name}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                        No employees found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Button-style Tabs with Icons */}
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }
                  `}
                >
                  <IconComponent size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Back Button and Theme Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default AllApprovalHead;