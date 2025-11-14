// components/common/dropdown/DateDropdown.tsx
import React from 'react';
import { Calendar } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import Dropdown from './dropDown';

interface DateDropdownProps {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  className?: string;
}

const DateDropdown: React.FC<DateDropdownProps> = ({
  label,
  date,
  onDateChange,
  isOpen,
  onToggle,
  onClose,
  className = ''
}) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onDateChange(selectedDate);
  };

  const handleOkClick = () => {
    onClose();
  };

  const dropdownContent = (
    <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
      <div className="p-2">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</div>
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md border dark:border-gray-600"
        />
        <div className="flex justify-end p-2 border-t dark:border-gray-600">
          <button 
            className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-blue-700"
            onClick={handleOkClick}
          >
            OK
          </button>
        </div>
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
      value={formatDate(date)}
    >
      {dropdownContent}
    </Dropdown>
  );
};

export default DateDropdown;