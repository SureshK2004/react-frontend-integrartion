import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Dropdown from './dropDown';

interface MultipleSearchDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onSelect: (values: string[]) => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const MultipleSearchDropdown: React.FC<MultipleSearchDropdownProps> = ({
  label,
  options,
  selectedValues,
  onSelect,
  isOpen,
  onToggle,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedValues.includes(option)
  );

  const handleSelect = (option: string) => {
    onSelect([...selectedValues, option]);
    setSearchQuery('');
  };

  const handleRemove = (option: string) => {
    onSelect(selectedValues.filter(val => val !== option));
  };

  const clearAll = () => {
    onSelect([]);
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const displayValue = selectedValues.length > 0 
    ? `${selectedValues.length} selected`
    : '';

  const dropdownContent = (
    <div 
      ref={dropdownRef}
      className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10"
    >
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
      
      {/* Selected items */}
      {selectedValues.length > 0 && (
        <div className="p-2 border-b dark:border-gray-600">
          <div className="flex flex-wrap gap-1">
            {selectedValues.map((value, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
              >
                {value}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => handleRemove(value)}
                />
              </span>
            ))}
            <button
              onClick={clearAll}
              className="text-xs text-red-600 dark:text-red-400 hover:underline ml-2"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
      
      <div className="max-h-48 overflow-y-auto">
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
      className={className}
      value={displayValue}
    >
      {dropdownContent}
    </Dropdown>
  );
};

export default MultipleSearchDropdown;