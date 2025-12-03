  // components/common/dropdown/SearchDropdown.tsx
  import React, { useState, useEffect } from 'react';
  import { Search } from 'lucide-react';
  import Dropdown from './dropDown';

  interface SearchDropdownProps {
    label: string;
    options: string[];
    value: string;
    onSelect: (value: string) => void;
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    className?: string;
  }

  const SearchDropdown: React.FC<SearchDropdownProps> = ({
    label,
    options,
    value,
    onSelect,
    isOpen,
    onToggle,
    onClose,
    className = ''
  }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (option: string) => {
      onSelect(option);
      setSearchQuery('');
      onClose();
    };

    useEffect(() => {
      if (!isOpen) {
        setSearchQuery('');
      }
    }, [isOpen]);

    const dropdownContent = (
      <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
        <div className="p-2 border-b dark:border-gray-600">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${label}`}
              className="w-full pl-6 pr-2 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        
        <div className="max-h-48 overflow-y-auto">
          <div
            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
            onClick={() => handleSelect('')}
          >
            Select {label}
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              No options found
            </div>
          )}
        </div>
      </div>
    );

    return (
      <Dropdown
        label={label}
        isOpen={isOpen}
        onToggle={onToggle}
        onClose={onClose}
        className={className}
        value={value}
      >
        {dropdownContent}
      </Dropdown>
    );
  };

  export default SearchDropdown;