// components/common/CommonFilters.tsx
import React, { useState } from 'react';
import { Search, RefreshCw, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import SearchDropdown from './searchDropdown';
import DateDropdown from './dateDropdown';
import Dropdown from './dropDown';

export interface FilterConfig {
  showUserType?: boolean;
  showDepartment?: boolean;
  showZone?: boolean;
  showBranch?: boolean;
  showFromDate?: boolean;
  showToDate?: boolean;
  showFilterForm?: boolean;
  showColumnSelector?: boolean;
  showStatus?: boolean;
  showTotalHours?: boolean;
  showDesignation?: boolean;
  
  labels?: {
    userType?: string;
    department?: string;
    zone?: string;
    branch?: string;
    from?: string;
    to?: string;
    filter?: string;
    column?: string;
    searchPlaceholder?: string;
      fromDatePlaceholder?: string,
      toDatePlaceholder?:string,
      departmentPlaceholder?: string,
      branchPlaceholder?: string,
      zonePlaceholder?:string 
  };
  
  options?: {
    userType?: string[];
    department?: string[];
    zone?: string[];
    branch?: string[];
    status?: string[];
    totalHours?: string[];
    designation?: string[];
  };
  
  onFilterChange?: (filters: any) => void;
  onSearch?: (query: string) => void;
  onRefresh?: () => void;
  
  initialFilters?: {
    department?: string;
    designation?: string;
    status?: string;
    fromDate?: Date;
    toDate?: Date;
    totalHours?: string;
    zone?: string;
    branch?: string;
  };
}

interface CommonFiltersProps {
  config: FilterConfig;
  showTopFilters?: boolean;
}

interface DropdownState {
  userType: boolean;
  department: boolean;
  zone: boolean;
  branch: boolean;
  from: boolean;
  to: boolean;
  filter: boolean;
  column: boolean;
}

interface ColumnState {
  employeeId: boolean;
  date: boolean;
  department: boolean;
  totalHours: boolean;
  punchIn: boolean;
  punchOut: boolean;
}

interface FilterState {
  department: string;
  designation: string;
  status: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  totalHours: string;
  zone: string;
  branch: string;
}

const CommonFilters: React.FC<CommonFiltersProps> = ({ 
  config, 
  showTopFilters = true 
}) => {
  const {
    showUserType = false,
    showDepartment = false,
    showZone = false,
    showBranch = false,
    showFromDate = false,
    showToDate = false,
    showFilterForm = false,
    showColumnSelector = false,
    showStatus = false,
    showTotalHours = false,
    showDesignation = false,
    labels = {},
    options = {},
    onFilterChange,
    onSearch,
    onRefresh,
    initialFilters = {}
  } = config;

  const [dropdowns, setDropdowns] = useState<DropdownState>({
    userType: false,
    department: false,
    zone: false,
    branch: false,
    from: false,
    to: false,
    filter: false,
    column: false
  });

  const [isFilterFormOpen, setIsFilterFormOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [columnState, setColumnState] = useState<ColumnState>({
    employeeId: true,
    date: true,
    department: true,
    totalHours: true,
    punchIn: true,
    punchOut: true
  });

  const [filterState, setFilterState] = useState<FilterState>({
    department: initialFilters.department || '',
    designation: initialFilters.designation || '',
    status: initialFilters.status || '',
    fromDate: initialFilters.fromDate,
    toDate: initialFilters.toDate,
    totalHours: initialFilters.totalHours || '',
    zone: initialFilters.zone || '',
    branch: initialFilters.branch || ''
  });

  // Modal dropdown states
  const [modalDropdowns, setModalDropdowns] = useState<Record<string, boolean>>({
    zone: false,
    branch: false,
    department: false,
    designation: false,
    status: false,
    totalHours: false
  });

  const toggleDropdown = (dropdown: keyof DropdownState) => {
    setDropdowns(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: key === dropdown ? !prev[key as keyof DropdownState] : false
      }), {} as DropdownState)
    }));
  };

  const closeDropdown = (dropdown: keyof DropdownState) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: false
    }));
  };

  const toggleModalDropdown = (dropdown: string) => {
    setModalDropdowns(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: key === dropdown ? !prev[key] : false
      }), {} as Record<string, boolean>)
    }));
  };

  const closeModalDropdown = (dropdown: string) => {
    setModalDropdowns(prev => ({
      ...prev,
      [dropdown]: false
    }));
  };

  const handleColumnChange = (column: keyof ColumnState) => {
    setColumnState(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const handleFilterChange = (field: keyof FilterState, value: any) => {
    const newFilters = {
      ...filterState,
      [field]: value
    };
    setFilterState(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange(filterState);
    }
    closeFilterForm();
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const openFilterForm = () => {
    setIsClosing(false);
    setIsFilterFormOpen(true);
    setModalDropdowns({
      zone: false,
      branch: false,
      department: false,
      designation: false,
      status: false,
      totalHours: false
    });
  };

  const closeFilterForm = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsFilterFormOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const filterButtons = [
    { 
      key: 'userType', 
      label: labels.userType || 'User Name', 
      options: options.userType || ['Akash', 'Manoj', 'Gokul', 'John', 'Doe'], 
      show: showUserType 
    },
    { 
      key: 'department', 
      label: labels.department || 'Department', 
      options: options.department || ['Design', 'Development', 'Marketing', 'HR', 'Finance'], 
      show: showDepartment 
    }
  ].filter(button => button.show);

  const actionButtons = [
    { key: 'from', label: labels.from || 'From', isDate: true, show: showFromDate },
    { key: 'to', label: labels.to || 'To', isDate: true, show: showToDate },
    { key: 'filter', label: labels.filter || 'Filter', isDate: false, show: showFilterForm }
  ].filter(button => button.show);

  return (
    <div className="space-y-4 mb-6">
      {/* Filter Form Modal */}
      {isFilterFormOpen && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50 transition-opacity duration-300 ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={closeFilterForm}
        >
          <div 
            className={`bg-white dark:bg-gray-800 rounded-l-lg shadow-xl p-6 w-full max-w-sm h-full overflow-y-auto transition-transform duration-300 ease-in-out ${
              isClosing ? 'translate-x-full' : 'translate-x-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white w-full text-center">Filters</h2>
              <button 
                onClick={closeFilterForm}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 absolute right-4 top-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              {/* Zone Filter */}
              {showZone && (
                <SearchDropdown
                  label="Zone"
                  options={options.zone || ['North', 'South', 'East', 'West', 'Central']}
                  value={filterState.zone}
                  onSelect={(value) => handleFilterChange('zone', value.toLowerCase())}
                  isOpen={modalDropdowns.zone}
                  onToggle={() => toggleModalDropdown('zone')}
                  onClose={() => closeModalDropdown('zone')}
                />
              )}
              
              {/* Branch Filter */}
              {showBranch && (
                <SearchDropdown
                  label="Branch"
                  options={options.branch || ['Main', 'Downtown', 'Uptown', 'Suburban']}
                  value={filterState.branch}
                  onSelect={(value) => handleFilterChange('branch', value.toLowerCase())}
                  isOpen={modalDropdowns.branch}
                  onToggle={() => toggleModalDropdown('branch')}
                  onClose={() => closeModalDropdown('branch')}
                />
              )}
              
              {/* Department Filter */}
              {showDepartment && (
                <SearchDropdown
                  label="Department"
                  options={options.department || ['Design', 'Development', 'Marketing', 'HR']}
                  value={filterState.department}
                  onSelect={(value) => handleFilterChange('department', value.toLowerCase())}
                  isOpen={modalDropdowns.department}
                  onToggle={() => toggleModalDropdown('department')}
                  onClose={() => closeModalDropdown('department')}
                />
              )}
              
              {/* Designation Filter */}
              {showDesignation && (
                <SearchDropdown
                  label="Designation"
                  options={options.designation || ['Designer', 'Developer', 'Manager', 'Executive']}
                  value={filterState.designation}
                  onSelect={(value) => handleFilterChange('designation', value.toLowerCase())}
                  isOpen={modalDropdowns.designation}
                  onToggle={() => toggleModalDropdown('designation')}
                  onClose={() => closeModalDropdown('designation')}
                />
              )}
              
              {/* Status Filter */}
              {showStatus && (
                <SearchDropdown
                  label="Status"
                  options={options.status || ['Active', 'Inactive', 'Pending']}
                  value={filterState.status}
                  onSelect={(value) => handleFilterChange('status', value.toLowerCase())}
                  isOpen={modalDropdowns.status}
                  onToggle={() => toggleModalDropdown('status')}
                  onClose={() => closeModalDropdown('status')}
                />
              )}
              
              {/* Total Hours Filter */}
              {showTotalHours && (
                <SearchDropdown
                  label="Total Hours"
                  options={options.totalHours || ['4', '6', '8', '10']}
                  value={filterState.totalHours}
                  onSelect={(value) => handleFilterChange('totalHours', value)}
                  isOpen={modalDropdowns.totalHours}
                  onToggle={() => toggleModalDropdown('totalHours')}
                  onClose={() => closeModalDropdown('totalHours')}
                />
              )}
              
              {/* Column Selector */}
              {showColumnSelector && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Column</label>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(columnState).map(([key, checked]) => (
                        <div key={key} className="flex items-center space-x-2 py-1">
                          <Checkbox 
                            id={`modal-${key}`}
                            checked={checked}
                            onCheckedChange={() => handleColumnChange(key as keyof ColumnState)}
                          />
                          <label 
                            htmlFor={`modal-${key}`} 
                            className="text-sm cursor-pointer text-gray-700 dark:text-gray-300 capitalize"
                          >
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={closeFilterForm}
                className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={applyFilters}
                className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Filter Buttons */}
      {showTopFilters && filterButtons.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 justify-end">
          {filterButtons.map((filter) => (
            <SearchDropdown
              key={filter.key}
              label={filter.label}
              options={filter.options}
              value={filterState[filter.key as keyof FilterState] as string}
              onSelect={(value) => handleFilterChange(filter.key as keyof FilterState, value.toLowerCase())}
              isOpen={dropdowns[filter.key as keyof DropdownState]}
              onToggle={() => toggleDropdown(filter.key as keyof DropdownState)}
              onClose={() => closeDropdown(filter.key as keyof DropdownState)}
              className="w-auto"
            />
          ))}
          <button 
            className="p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
            onClick={handleRefresh}
          >
            <RefreshCw className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      )}

      {/* Search and Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-40 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={labels.searchPlaceholder || "Search"}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm font-medium"
          onClick={handleSearch}
        >
          Search
        </button>
{actionButtons.map((action) => (
  <div key={action.key} className="relative">
    {action.key === 'filter' ? (
      <button
        onClick={openFilterForm}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
      >
        <span className="text-gray-700 dark:text-gray-300 font-medium">{action.label}</span>
      </button>
    ) : action.isDate ? (
      <DateDropdown
        label={action.label}
        date={action.key === 'from' ? filterState.fromDate : filterState.toDate}
        onDateChange={(date) => {
          const field = action.key === 'from' ? 'fromDate' : 'toDate';
          handleFilterChange(field as keyof FilterState, date);
        }}
        isOpen={dropdowns[action.key as keyof DropdownState]}
        onToggle={() => toggleDropdown(action.key as keyof DropdownState)}
        onClose={() => closeDropdown(action.key as keyof DropdownState)}
      />
    ) : (
      <Dropdown
        label={action.label}
        isOpen={dropdowns[action.key as keyof DropdownState]}
        onToggle={() => toggleDropdown(action.key as keyof DropdownState)}
        onClose={() => closeDropdown(action.key as keyof DropdownState)} // Add this line
        className="w-auto"
      >
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 w-48">
          <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-700 dark:text-gray-300">
            Option 1
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-700 dark:text-gray-300">
            Option 2
          </div>
        </div>
      </Dropdown>
    )}
  </div>
))}
        <button 
          className="p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
          onClick={handleRefresh}
        >
          <RefreshCw className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default CommonFilters;